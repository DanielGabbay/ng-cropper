import type { Meta, StoryObj } from '@storybook/angular';
import { NgCropper } from './NgCropper';
import { expect } from 'storybook/test';

const meta: Meta<NgCropper> = {
  component: NgCropper,
  title: 'NgCropper',
};
export default meta;

type Story = StoryObj<NgCropper>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/ng-cropper/gi)).toBeTruthy();
  },
};
