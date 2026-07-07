import { describe, it, expect } from 'vitest';
import { safeHref } from '../../lib/safeHref';

describe('safeHref - SPEC-014 AC-15', () => {
  // Allowed schemes pass through unchanged
  it('passes https: URLs unchanged', () => {
    expect(safeHref('https://example.com')).toBe('https://example.com');
  });

  it('passes http: URLs unchanged', () => {
    expect(safeHref('http://example.com')).toBe('http://example.com');
  });

  it('passes mailto: URLs unchanged', () => {
    expect(safeHref('mailto:contact@headlessengineer.xyz')).toBe(
      'mailto:contact@headlessengineer.xyz',
    );
  });

  it('passes tel: URLs unchanged', () => {
    expect(safeHref('tel:+1234567890')).toBe('tel:+1234567890');
  });

  // Relative paths pass through unchanged
  it('passes root-relative paths unchanged', () => {
    expect(safeHref('/contact')).toBe('/contact');
  });

  // Blocked schemes return '#'
  it('blocks javascript: scheme', () => {
    expect(safeHref('javascript:alert(1)')).toBe('#');
  });

  it('blocks data: scheme', () => {
    expect(safeHref('data:text/html,<script>alert(1)</script>')).toBe('#');
  });

  it('blocks vbscript: scheme', () => {
    expect(safeHref('vbscript:msgbox(1)')).toBe('#');
  });
});
