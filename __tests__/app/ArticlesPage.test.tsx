// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

const BLOG_URL = 'https://blog.headlessengineer.xyz';

const replaceMock = vi.fn();

beforeEach(() => {
  replaceMock.mockClear();
  Object.defineProperty(window, 'location', {
    value: { replace: replaceMock },
    writable: true,
  });
});

const { default: ArticlesPage } = await import('../../app/articles/page');

describe('ArticlesPage — redirect to blog', () => {
  it('renders a visible link to the blog URL', () => {
    render(<ArticlesPage />);
    const link = screen.getByRole('link', { name: /blog\.headlessengineer\.xyz/i });
    expect(link).toHaveAttribute('href', BLOG_URL);
  });

  it('calls window.location.replace with the blog URL on mount', () => {
    render(<ArticlesPage />);
    expect(replaceMock).toHaveBeenCalledWith(BLOG_URL);
  });
});
