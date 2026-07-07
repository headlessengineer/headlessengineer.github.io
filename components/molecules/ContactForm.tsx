'use client';

import { useState } from 'react';
import type { JSX, ChangeEvent, FormEvent } from 'react';
import { Button } from '../atoms/Button';
import styles from './ContactForm.module.css';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormFields {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = 'Name is required.';
  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.message.trim()) {
    errors.message = 'Message is required.';
  } else if (fields.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters.';
  }
  return errors;
}

export function ContactForm(): JSX.Element {
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError('');
    const errs = validate(fields);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setFormError('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setStatus('error');
      setFormError('Something went wrong. Please try again or email us directly.');
    }
  }

  if (status === 'success') {
    return (
      <p role="status" className={styles.successMessage}>
        Thanks - we&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="form-heading" className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={fields.name}
          onChange={handleChange}
          aria-describedby={errors.name ? 'name-error' : undefined}
          placeholder="Your name"
        />
        {errors.name && (
          <span id="name-error" role="alert" className={styles.fieldError}>
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          aria-describedby={errors.email ? 'email-error' : undefined}
          placeholder="you@company.com"
        />
        {errors.email && (
          <span id="email-error" role="alert" className={styles.fieldError}>
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={fields.message}
          onChange={handleChange}
          aria-describedby={errors.message ? 'message-error' : undefined}
          placeholder="What are you working on?"
        />
        {errors.message && (
          <span id="message-error" role="alert" className={styles.fieldError}>
            {errors.message}
          </span>
        )}
      </div>

      {formError && (
        <p role="alert" className={styles.formError}>
          {formError}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={status === 'submitting'} className={styles.submitBtn}>
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  );
}
