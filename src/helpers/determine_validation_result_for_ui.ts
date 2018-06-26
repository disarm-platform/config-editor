/**
 *
 * @param response
 * @returns {any}
 */
import {TUnifiedResponse} from '@locational/config-validation/build/module/lib/TUnifiedResponse';

export interface ValidationResult {
  passed: boolean;
  support_messages?: SupportMessageHere[];
}

export interface SupportMessageHere {
  message: string;
  nodes?: string[];
}

export function determine_validation_result(response: TUnifiedResponse): ValidationResult {
  if (response.status.startsWith('Red') && response.support_messages) {
    return {
      passed: false,
      support_messages: response.support_messages.map((m) => {
        return {
          message: m,
        };
      }),
    };
  }
  const edge_statuses_that_fail = response.edge_messages.filter((e) => e.status.startsWith('Red'));

  const messages_to_show = edge_statuses_that_fail.map((e) => {
    if (e.custom_edge_responses.length) {
      const custom_message = e.custom_edge_responses
        .filter((cer) => cer.status.startsWith('Red'))
        .map((cer) => cer.message);
      return {
        message: custom_message.join(','),
        nodes: [e.source_node_name, e.target_node_name],
      };
    } else {
      return {
        message: e.message,
        nodes: [],
      };
    }
  });

  return {
    passed: edge_statuses_that_fail.length === 0,
    support_messages: messages_to_show,
  };
}
