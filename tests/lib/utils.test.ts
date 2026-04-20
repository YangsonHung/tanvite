import { describe, expect, it } from 'vitest';
import { cn } from '@/shared/lib/utils';

describe('cn()', () => {
  it('合并普通 class', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('合并时移除 Tailwind 冲突类', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('过滤 falsy 值', () => {
    expect(cn('foo', false && 'bar', undefined, 'baz')).toBe('foo baz');
  });
});
