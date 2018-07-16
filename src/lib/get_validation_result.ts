import { EStandardEdgeStatus, TStandardEdgeResponse } from '@locational/config-validation/build/module/lib/TStandardEdgeResponse';
import { ECustomEdgeStatus } from '@locational/config-validation/build/module/lib/TCustomEdgeResponse';
import { TUnifiedResponse } from '../../node_modules/@locational/config-validation/build/module/lib/TUnifiedResponse';

const debug_options = {
  all: [EStandardEdgeStatus.Red, EStandardEdgeStatus.Green, EStandardEdgeStatus.Blue],
  warnings_errors: [EStandardEdgeStatus.Red, EStandardEdgeStatus.Blue],
  errors: [EStandardEdgeStatus.Red]
};

// Can pass debug_level as arg to get_validation_result in the future
const debug_level: EStandardEdgeStatus[] = debug_options.errors;

function get_type(status: EStandardEdgeStatus): string {
  switch (status) {
    case EStandardEdgeStatus.Red:
      return 'error';
    case EStandardEdgeStatus.Blue:
      return 'warning';
    case EStandardEdgeStatus.Green:
      return 'success';

    default:
      return 'warning';
  }
}

export function get_validation_result(validation_result: TUnifiedResponse, node_name: string) {
  const edge_messages: TStandardEdgeResponse[] = validation_result.edge_messages
    .filter((edge: TStandardEdgeResponse) => {
      return debug_level.some((level) => level === edge.status);
    });

  const relevant_responses: TStandardEdgeResponse[] = edge_messages
    .filter((result: any) => {
      return result.source_node_name === node_name || result.target_node_name === node_name;
    });

  return relevant_responses.map((response: TStandardEdgeResponse) => {
    const messages = response.custom_edge_responses
      .filter((r) => r.status === ECustomEdgeStatus.Red)
      .map((r) => r.message);

    return {
      type: get_type(response.status),
      message: response.message,
      messages,
    }
  })
}