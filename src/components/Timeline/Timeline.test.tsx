import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Timeline from './Timeline';
import type { TimelineItem } from '../../types';

const mockTimeline: TimelineItem[] = [
  {
    id: 'event1',
    year: '2023',
    title: 'Test Event',
    institution: 'Test Institution',
    description: 'Test description',
    type: 'education',
  },
  {
    id: 'event2',
    year: '2024',
    title: 'Another Event',
    institution: 'Another Institution',
    description: 'Another description',
    type: 'milestone',
  },
];

describe('Timeline', () => {
  it('renders timeline section with heading', () => {
    render(<Timeline timeline={mockTimeline} />);
    expect(screen.getByRole('heading', { name: /my journey/i })).toBeInTheDocument();
  });

  it('renders all timeline events', () => {
    render(<Timeline timeline={mockTimeline} />);
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Another Event')).toBeInTheDocument();
  });

  it('displays event details correctly', () => {
    render(<Timeline timeline={mockTimeline} />);
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('Test Institution')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders empty timeline gracefully', () => {
    render(<Timeline timeline={[]} />);
    expect(screen.getByRole('heading', { name: /my journey/i })).toBeInTheDocument();
  });
});
