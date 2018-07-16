import { EStandardEdgeStatus, TStandardEdgeResponse } from '@locational/config-validation/build/module/lib/TStandardEdgeResponse';
import { ECustomEdgeStatus } from '@locational/config-validation/build/module/lib/TCustomEdgeResponse';
import { TUnifiedResponse } from '../../node_modules/@locational/config-validation/build/module/lib/TUnifiedResponse';

const debug_options = {
  all: [EStandardEdgeStatus.Red, EStandardEdgeStatus.Green, EStandardEdgeStatus.Blue],
  warnings_errors: [EStandardEdgeStatus.Red, EStandardEdgeStatus.Blue],
  errors: [EStandardEdgeStatus.Red]
};

// Can pass debug_level as arg to get_validation_result in the future
// TODO: Rename 
const validation_result_types_to_include: EStandardEdgeStatus[] = debug_options.errors;

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

export function get_validation_result_for_node(validation_result: TUnifiedResponse, node_name?: string) {
  const edge_messages: TStandardEdgeResponse[] = validation_result.edge_messages
    .filter((edge: TStandardEdgeResponse) => {
      return validation_result_types_to_include.some((level) => level === edge.status);
    });

  const relevant_responses: TStandardEdgeResponse[] = edge_messages
    .filter((result: any) => {
      if (!node_name) {
        return true;
      }
      return result.source_node_name === node_name || result.target_node_name === node_name;
    });

  return relevant_responses.map((response: TStandardEdgeResponse) => {
    const messages = response.custom_edge_responses
      // TODO: Respect debug_level
      // cannot compare EStandardEdgeStatus to ECustomEdgeStatus, probably good enough for now
      .filter((r) => r.status === ECustomEdgeStatus.Red)
      .map((r) => r.message);

    return {
      type: get_type(response.status),
      message: response.message,
      messages,
    }
  })
}