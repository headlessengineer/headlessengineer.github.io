---
title: 'Zero-Downtime Database Migrations at Scale'
slug: 'zero-downtime-database-migrations-at-scale'
description: 'Practical patterns for running database schema migrations without downtime on high-traffic PostgreSQL systems. Covers expand/contract, shadow tables, and online index builds.'
excerpt: 'Downtime for database migrations is a choice, not a requirement. These are the patterns that make schema changes invisible to users - even on tables with hundreds of millions of rows.'
publishedAt: '2026-02-05'
updatedAt: '2026-02-05'
category: 'system-design'
subcategory: 'database-engineering'
tags: ['database', 'postgresql', 'migrations', 'zero-downtime', 'distributed-systems', 'devops']
author: 'Tech Architect'
readingTime: 16
published: true
seo:
  metaTitle: 'Zero-Downtime Database Migrations at Scale'
  metaDescription: 'Run PostgreSQL schema migrations without downtime. Expand/contract pattern, shadow tables, and online index builds for high-traffic systems.'
  keywords: ['zero downtime migrations', 'postgresql', 'database migrations', 'expand contract', 'online schema change', 'distributed systems']
  canonicalUrl: '/articles/system-design/zero-downtime-database-migrations-at-scale'
  ogImage: '/images/articles/zero-downtime-migrations-og.jpg'
---

## Why Migrations Cause Downtime

Most migration-related downtime comes from three sources:

1. **Table locks** - `ALTER TABLE` acquires an exclusive lock that blocks reads and writes
2. **Long-running transactions** - migrations that touch every row hold locks for minutes
3. **Application/schema mismatch** - deploying code that expects the new schema before the migration runs (or vice versa)

Each has a solution. None requires a maintenance window.

## The Expand/Contract Pattern

The safest approach to any breaking schema change is to split it into three phases:

**Phase 1 - Expand:** Add the new column/table alongside the old one. Both old and new code work.

```sql
-- Safe: adding a nullable column never locks
ALTER TABLE orders ADD COLUMN customer_ref_id UUID;
```

**Phase 2 - Migrate:** Backfill data in batches. Never update all rows in a single transaction.

```sql
-- Backfill in batches of 1000 to avoid long-running locks
UPDATE orders SET customer_ref_id = customer_id::UUID
WHERE id BETWEEN $1 AND $2 AND customer_ref_id IS NULL;
```

**Phase 3 - Contract:** Once all code uses the new column and the old one is empty, drop it.

```sql
ALTER TABLE orders DROP COLUMN customer_id;
```

## Online Index Builds

PostgreSQL 12+ supports `CREATE INDEX CONCURRENTLY` - it builds the index without blocking writes. The trade-off: it takes longer and can fail if a concurrent write violates the index constraint.

```sql
CREATE INDEX CONCURRENTLY idx_orders_customer_ref
ON orders (customer_ref_id)
WHERE customer_ref_id IS NOT NULL;
```

Always use `CONCURRENTLY` on production tables. Always.

## Deployment Order Matters

The correct deployment sequence for a column rename:

1. Deploy code that writes to both old and new columns
2. Run migration to add new column and backfill
3. Deploy code that reads from new column only
4. Run migration to drop old column

Reversing steps 2 and 3 is the most common cause of migration-related incidents.
