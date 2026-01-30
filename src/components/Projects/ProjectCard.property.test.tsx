import { describe, it, expect } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import fc from 'fast-check';
import ProjectCard from './ProjectCard';
import type { Project } from '../../types';

/**
 * Property-Based Tests for Project Card Hover Tilt Effect
 * 
 * These tests verify universal properties that should hold true across all valid inputs
 * using the fast-check library for property-based testing.
 */

describe('ProjectCard - Property-Based Tests', () => {
  /**
   * Property 3: Hover Tilt Effect Application
   * **Validates: Requirements 2.4**
   * 
   * For any project card, when a visitor hovers over it, a 3D tilt transform
   * should be applied to the card element.
   */
  describe('Property 3: Hover Tilt Effect Application', () => {
    it('should apply 3D tilt transform to any project card on mouse move', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random project data
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 50 }),
            title: fc.string({ minLength: 1, maxLength: 100 }),
            description: fc.string({ minLength: 1, maxLength: 500 }),
            techStack: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 10 }),
            category: fc.string({ minLength: 1, maxLength: 50 }),
            githubUrl: fc.option(fc.webUrl(), { nil: undefined }),
            demoUrl: fc.option(fc.webUrl(), { nil: undefined }),
            imageUrl: fc.webUrl(),
          }),
          // Generate random mouse position within card bounds
          fc.record({
            cardWidth: fc.integer({ min: 200, max: 600 }),
            cardHeight: fc.integer({ min: 200, max: 600 }),
            mouseX: fc.integer({ min: 50, max: 550 }), // Keep away from edges
            mouseY: fc.integer({ min: 50, max: 550 }),
          }),
          async (projectData, mouseData) => {
            // Render the project card
            const { container } = render(<ProjectCard project={projectData as Project} />);

            const cardWrapper = container.querySelector('.project-card-wrapper') as HTMLElement;
            expect(cardWrapper).toBeInTheDocument();

            // Mock getBoundingClientRect to return consistent dimensions
            const mockRect = {
              left: 0,
              top: 0,
              width: mouseData.cardWidth,
              height: mouseData.cardHeight,
              right: mouseData.cardWidth,
              bottom: mouseData.cardHeight,
              x: 0,
              y: 0,
              toJSON: () => ({}),
            };

            cardWrapper.getBoundingClientRect = () => mockRect;

            // Simulate mouse move event with random position
            const mouseEvent = new MouseEvent('mousemove', {
              bubbles: true,
              cancelable: true,
              clientX: mouseData.mouseX,
              clientY: mouseData.mouseY,
            });

            // Trigger mouse move
            fireEvent(cardWrapper, mouseEvent);

            // PROPERTY: When hovering over a project card, a 3D tilt transform should be applied
            // The tilt style is applied via React state, so we need to wait a bit
            await new Promise(resolve => setTimeout(resolve, 50));

            const style = cardWrapper.style.transform;

            // Verify that a transform is applied
            expect(style).toBeTruthy();

            // Verify that the transform includes perspective (3D effect)
            expect(style).toContain('perspective');

            // Verify that the transform includes rotateX (tilt on X axis)
            expect(style).toContain('rotateX');

            // Verify that the transform includes rotateY (tilt on Y axis)
            expect(style).toContain('rotateY');

            // Verify that the transform includes scale3d (zoom effect)
            expect(style).toContain('scale3d');

            // The scale should be 1.05 (card should be slightly enlarged)
            expect(style).toContain('scale3d(1.05, 1.05, 1.05)');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should reset tilt transform to neutral position when mouse leaves any project card', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random project data
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 50 }),
            title: fc.string({ minLength: 1, maxLength: 100 }),
            description: fc.string({ minLength: 1, maxLength: 500 }),
            techStack: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 10 }),
            category: fc.string({ minLength: 1, maxLength: 50 }),
            githubUrl: fc.option(fc.webUrl(), { nil: undefined }),
            demoUrl: fc.option(fc.webUrl(), { nil: undefined }),
            imageUrl: fc.webUrl(),
          }),
          async (projectData) => {
            // Render the project card
            const { container } = render(<ProjectCard project={projectData as Project} />);

            const cardWrapper = container.querySelector('.project-card-wrapper') as HTMLElement;
            expect(cardWrapper).toBeInTheDocument();

            // Mock getBoundingClientRect
            const mockRect = {
              left: 0,
              top: 0,
              width: 400,
              height: 400,
              right: 400,
              bottom: 400,
              x: 0,
              y: 0,
              toJSON: () => ({}),
            };

            cardWrapper.getBoundingClientRect = () => mockRect;

            // First, apply a tilt by moving mouse
            const mouseMoveEvent = new MouseEvent('mousemove', {
              bubbles: true,
              cancelable: true,
              clientX: 300,
              clientY: 300,
            });

            fireEvent(cardWrapper, mouseMoveEvent);

            // Wait for tilt to be applied
            await new Promise(resolve => setTimeout(resolve, 50));

            let style = cardWrapper.style.transform;
            expect(style).toContain('perspective');
            expect(style).toContain('rotateX');
            expect(style).toContain('rotateY');

            // Now simulate mouse leave
            fireEvent.mouseLeave(cardWrapper);

            // PROPERTY: When mouse leaves a project card, tilt should reset to neutral position
            await new Promise(resolve => setTimeout(resolve, 50));

            style = cardWrapper.style.transform;

            // Verify that transform is reset to neutral
            expect(style).toContain('perspective(1000px)');
            expect(style).toContain('rotateX(0deg)');
            expect(style).toContain('rotateY(0deg)');
            expect(style).toContain('scale3d(1, 1, 1)');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should calculate tilt angles within expected range for any mouse position', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random project data
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 50 }),
            title: fc.string({ minLength: 1, maxLength: 100 }),
            description: fc.string({ minLength: 1, maxLength: 500 }),
            techStack: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 10 }),
            category: fc.string({ minLength: 1, maxLength: 50 }),
            imageUrl: fc.webUrl(),
          }),
          // Generate card dimensions and mouse position
          fc.record({
            cardWidth: fc.integer({ min: 200, max: 600 }),
            cardHeight: fc.integer({ min: 200, max: 600 }),
            mouseX: fc.integer({ min: 0, max: 600 }),
            mouseY: fc.integer({ min: 0, max: 600 }),
          }),
          async (projectData, dimensions) => {
            // Render the project card
            const { container } = render(<ProjectCard project={projectData as Project} />);

            const cardWrapper = container.querySelector('.project-card-wrapper') as HTMLElement;
            expect(cardWrapper).toBeInTheDocument();

            // Mock getBoundingClientRect
            const mockRect = {
              left: 0,
              top: 0,
              width: dimensions.cardWidth,
              height: dimensions.cardHeight,
              right: dimensions.cardWidth,
              bottom: dimensions.cardHeight,
              x: 0,
              y: 0,
              toJSON: () => ({}),
            };

            cardWrapper.getBoundingClientRect = () => mockRect;

            // Simulate mouse move
            const mouseEvent = new MouseEvent('mousemove', {
              bubbles: true,
              cancelable: true,
              clientX: dimensions.mouseX,
              clientY: dimensions.mouseY,
            });

            fireEvent(cardWrapper, mouseEvent);

            // PROPERTY: Tilt angles should be within expected range (-10 to 10 degrees)
            await new Promise(resolve => setTimeout(resolve, 50));

            const style = cardWrapper.style.transform;

            // Extract the rotation values and verify they're within bounds
            const rotateXMatch = style.match(/rotateX\((-?\d+\.?\d*)deg\)/);
            const rotateYMatch = style.match(/rotateY\((-?\d+\.?\d*)deg\)/);

            if (rotateXMatch && rotateYMatch) {
              const rotateX = parseFloat(rotateXMatch[1]);
              const rotateY = parseFloat(rotateYMatch[1]);

              // Verify angles are within the expected range
              expect(Math.abs(rotateX)).toBeLessThanOrEqual(10);
              expect(Math.abs(rotateY)).toBeLessThanOrEqual(10);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should apply tilt effect consistently across different project data', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate two different random projects
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 50 }),
            title: fc.string({ minLength: 1, maxLength: 100 }),
            description: fc.string({ minLength: 1, maxLength: 500 }),
            techStack: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 10 }),
            category: fc.string({ minLength: 1, maxLength: 50 }),
            imageUrl: fc.webUrl(),
          }),
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 50 }),
            title: fc.string({ minLength: 1, maxLength: 100 }),
            description: fc.string({ minLength: 1, maxLength: 500 }),
            techStack: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 10 }),
            category: fc.string({ minLength: 1, maxLength: 50 }),
            imageUrl: fc.webUrl(),
          }),
          async (project1Data, project2Data) => {
            // Render both project cards
            const { container: container1 } = render(<ProjectCard project={project1Data as Project} />);
            const { container: container2 } = render(<ProjectCard project={project2Data as Project} />);

            const card1 = container1.querySelector('.project-card-wrapper') as HTMLElement;
            const card2 = container2.querySelector('.project-card-wrapper') as HTMLElement;

            expect(card1).toBeInTheDocument();
            expect(card2).toBeInTheDocument();

            // Mock getBoundingClientRect for both cards with same dimensions
            const mockRect = {
              left: 0,
              top: 0,
              width: 400,
              height: 400,
              right: 400,
              bottom: 400,
              x: 0,
              y: 0,
              toJSON: () => ({}),
            };

            card1.getBoundingClientRect = () => mockRect;
            card2.getBoundingClientRect = () => mockRect;

            // Apply same mouse position to both cards
            const mouseEvent = new MouseEvent('mousemove', {
              bubbles: true,
              cancelable: true,
              clientX: 300,
              clientY: 300,
            });

            fireEvent(card1, mouseEvent);
            fireEvent(card2, mouseEvent);

            // PROPERTY: Tilt effect should be consistent across different project data
            // Both cards should have the same transform applied
            await new Promise(resolve => setTimeout(resolve, 50));

            const style1 = card1.style.transform;
            const style2 = card2.style.transform;

            // Both should have perspective
            expect(style1).toContain('perspective');
            expect(style2).toContain('perspective');

            // Both should have rotateX
            expect(style1).toContain('rotateX');
            expect(style2).toContain('rotateX');

            // Both should have rotateY
            expect(style1).toContain('rotateY');
            expect(style2).toContain('rotateY');

            // Both should have scale3d
            expect(style1).toContain('scale3d');
            expect(style2).toContain('scale3d');

            // The transforms should be identical (same mouse position, same card dimensions)
            expect(style1).toBe(style2);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain tilt effect structure for projects with optional fields', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate project with all optional fields potentially undefined
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 50 }),
            title: fc.string({ minLength: 1, maxLength: 100 }),
            description: fc.string({ minLength: 1, maxLength: 500 }),
            techStack: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 10 }),
            category: fc.string({ minLength: 1, maxLength: 50 }),
            githubUrl: fc.option(fc.webUrl(), { nil: undefined }),
            demoUrl: fc.option(fc.webUrl(), { nil: undefined }),
            imageUrl: fc.webUrl(),
          }),
          async (projectData) => {
            // Render the project card
            const { container } = render(<ProjectCard project={projectData as Project} />);

            const cardWrapper = container.querySelector('.project-card-wrapper') as HTMLElement;
            expect(cardWrapper).toBeInTheDocument();

            // Mock getBoundingClientRect
            const mockRect = {
              left: 0,
              top: 0,
              width: 400,
              height: 400,
              right: 400,
              bottom: 400,
              x: 0,
              y: 0,
              toJSON: () => ({}),
            };

            cardWrapper.getBoundingClientRect = () => mockRect;

            // Simulate mouse move
            const mouseEvent = new MouseEvent('mousemove', {
              bubbles: true,
              cancelable: true,
              clientX: 300,
              clientY: 300,
            });

            fireEvent(cardWrapper, mouseEvent);

            // PROPERTY: Tilt effect should work regardless of optional fields
            await new Promise(resolve => setTimeout(resolve, 50));

            const style = cardWrapper.style.transform;

            expect(style).toContain('perspective');
            expect(style).toContain('rotateX');
            expect(style).toContain('rotateY');
            expect(style).toContain('scale3d(1.05, 1.05, 1.05)');
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
