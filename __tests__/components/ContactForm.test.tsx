// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '../../components/molecules/ContactForm';

function mockFetch(status: number, body: unknown) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  });
}

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch(200, { success: true }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function fillValid() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Smith' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } });
  fireEvent.change(screen.getByLabelText('Message'), {
    target: { value: 'Hello, I would like to discuss a project with you.' },
  });
}

describe('ContactForm - SPEC-021 acceptance criteria', () => {
  // ── AC7: label / id pairings ──────────────────────────────────────────

  it('AC7: Name field has associated label', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('AC7: Email field has associated label', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('AC7: Message field has associated label', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  // ── AC4: empty submit - no fetch, field errors ────────────────────────

  it('AC4: empty submit does not call fetch', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  it('AC4: empty submit shows name error', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });

  it('AC4: empty submit shows email error', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it('AC4: empty submit shows message error', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  it('AC4: invalid email format shows error without fetching', () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'not-an-email' } });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'This is a valid length message for the form.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  it('AC4: message shorter than 20 chars shows error without fetching', () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Too short' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByText(/at least 20 characters/i)).toBeInTheDocument();
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  // ── AC5: valid submit → success ───────────────────────────────────────

  it('AC5: valid submit shows success message', async () => {
    render(<ContactForm />);
    fillValid();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() =>
      expect(screen.getByText(/thanks.*we'll be in touch/i)).toBeInTheDocument(),
    );
  });

  it('AC5: valid submit calls fetch with correct JSON body', async () => {
    render(<ContactForm />);
    fillValid();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => expect(vi.mocked(fetch)).toHaveBeenCalledOnce());
    const [url, options] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toBe('/api/contact');
    expect(options.method).toBe('POST');
    const body = JSON.parse(options.body as string) as Record<string, string>;
    expect(body.name).toBe('Jane Smith');
    expect(body.email).toBe('jane@example.com');
    expect(body).toHaveProperty('message');
  });

  it('AC5: success message replaces the form', async () => {
    render(<ContactForm />);
    fillValid();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument(),
    );
  });

  // ── AC6: server error → form-level error, form stays ─────────────────

  it('AC6: 500 response shows form-level error', async () => {
    vi.stubGlobal('fetch', mockFetch(500, { success: false }));
    render(<ContactForm />);
    fillValid();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument(),
    );
  });

  it('AC6: stale server error is cleared when re-submitting with invalid fields', async () => {
    vi.stubGlobal('fetch', mockFetch(500, { success: false }));
    render(<ContactForm />);
    fillValid();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument(),
    );
    // Now clear the name field and re-submit - should show field error, not server error
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });

  it('AC6: form remains editable after server error', async () => {
    vi.stubGlobal('fetch', mockFetch(500, { success: false }));
    render(<ContactForm />);
    fillValid();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument(),
    );
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  // ── AC8: aria-describedby on field errors ─────────────────────────────

  it('AC8: name input gets aria-describedby after empty submit', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-describedby', 'name-error');
  });

  it('AC8: name error element has id="name-error"', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(document.getElementById('name-error')).toBeInTheDocument();
  });

  it('AC8: email error element has id="email-error"', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(document.getElementById('email-error')).toBeInTheDocument();
  });

  it('AC8: message error element has id="message-error"', () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(document.getElementById('message-error')).toBeInTheDocument();
  });
});
