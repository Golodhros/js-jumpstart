import { type Metric } from 'web-vitals';
import { isProduction } from '@app/environment';

import { getSectionTagsFromLocation } from '../observability';

import { measureValue, MetricLabel, UnitEnum } from './realUserMonitoring';

/**
 * Sends a core web vital metric to the real user monitoring tool.
 * @param name The name of the metric.
 * @param value The value of the metric.
 * @returns void
 * @example
 * sendViaRUMTool({ name: 'INP', value: 100 });
 * @docs https://github.com/GoogleChrome/web-vitals?tab=readme-ov-file#metric
 */
function sendViaRUMTool(metric: Metric) {
  const { name, value } = metric;

  if (name === 'INP') {
    measureValue(MetricLabel.INTERACTION_TO_NEXT_PAINT, value, {
      tags: getSectionTagsFromLocation(),
      unit: UnitEnum.millisecond,
    });
  }
  if (name === 'LCP') {
    measureValue(MetricLabel.LARGEST_CONTENTFUL_PAINT, value, {
      tags: getSectionTagsFromLocation(),
      unit: UnitEnum.millisecond,
    });
  }
}

/**
 * Tracks the user interaction until the next paint event.
 */
export const trackInteractionToNextPaint = async () => {
  if (!isProduction()) {
    return;
  }

  const { onINP } = await import('web-vitals');
  onINP(sendViaRUMTool);
};

/**
 * Tracks the Largest Contentful Paint (LCP) metric.
 */
export const trackLargestContentfulPaint = async () => {
  if (!isProduction()) {
    return;
  }

  const { onLCP } = await import('web-vitals');
  onLCP(sendViaRUMTool);
};
