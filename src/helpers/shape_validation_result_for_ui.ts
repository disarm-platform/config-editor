/**
 *
 * @param response
 * @returns {any}
 */
import {TUnifiedResponse, EUnifiedStatus} from '@locational/config-validation/build/module/lib/TUnifiedResponse';
import { TStandardEdgeResponse, EStandardEdgeStatus } from '@locational/config-validation/build/module/lib/TStandardEdgeResponse';

export enum ValidationStatus {
  Invalid = 'Invalid',
  NotValidated = 'Not validated',
  Valid = 'Valid',
}

export interface TShapedValidationResult {
  passed: ValidationStatus;
  // stop validation from passing
  errors: TStandardEdgeResponse[];

  // might want to fix something, but will still pass. Status is Blue
  warnings: TStandardEdgeResponse[];

  //
  success: TStandardEdgeResponse[];
}

export function shape_validation_result(response: TUnifiedResponse): TShapedValidationResult {
  console.log('response', response);
  // console.log('response', response);
  const errors: TStandardEdgeResponse[] = [];
  const warnings: TStandardEdgeResponse[] = [];
  const success: TStandardEdgeResponse[] = [];

  const passed = response.status === EUnifiedStatus.Green ? ValidationStatus.Valid : ValidationStatus.Invalid;

  if (!passed && !response.edge_messages.length) {
    // this is a schema error
    // @ts-ignore
    errors.push({
      // @ts-ignore
      message: response.support_messages[0],
    });

  }

  for (const edge_message of response.edge_messages) {
    switch (edge_message.status) {
      case EStandardEdgeStatus.Red:
        errors.push(edge_message);
        break;

      case EStandardEdgeStatus.Blue:
        warnings.push(edge_message);
        break;

      case EStandardEdgeStatus.Green:
        success.push(edge_message);
        break;

      default:
        break;
    }
  }


  return {
    passed,
    errors,
    warnings,
    success,
  };




  // if (response.status.startsWith('Red') && response.support_messages) {
  //   return {
  //     passed: false,
  //     support_messages: response.support_messages.map((m) => {
  //       return {
  //         message: m,
  //       };
  //     }),
  //   };
  // }
  // const edge_statuses_that_fail = response.edge_messages.filter((e) => e.status.startsWith('Red'));

  // const messages_to_show = edge_statuses_that_fail.map((e) => {
  //   if (e.custom_edge_responses.length) {
  //     const custom_message = e.custom_edge_responses
  //       .filter((cer) => cer.status.startsWith('Red'))
  //       .map((cer) => cer.message);
  //     return {
  //       message: custom_message.join(','),
  //       nodes: [e.source_node_name, e.target_node_name],
  //     };
  //   } else {
  //     return {
  //       message: e.message,
  //       nodes: [],
  //     };
  //   }
  // });

  // return {
  //   passed: edge_statuses_that_fail.length === 0,
  //   support_messages: messages_to_show,
  // };
}
