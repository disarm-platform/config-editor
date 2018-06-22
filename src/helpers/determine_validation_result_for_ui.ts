export function determine_validation_result(response: any) {
  if (response.status.startsWith('Red')) {
    return {
      passed: false,
      support_messages: response.support_messages
    }
  }

  const edge_statuses_that_fail = response.edge_messages.filter(e => e.status.startsWith('Red'))

  const messages_to_show = edge_statuses_that_fail.map(e => {
    if (e.custom_edge_responses.length) {
      const custom_message = e.custom_edge_responses
        .filter((cer: {status: string}) => cer.status.startsWith('Red'))
        .map((cer: {message: string}) => cer.message)
      return {
        message: custom_message.join(','),
        nodes: [e.source_node_name, e.target_node_name]
      }
    } else {
      return {
        message: e.message,
        nodes: []
      }
    }
  })
  return {
    passed: edge_statuses_that_fail.length === 0,
    support_messages: messages_to_show
  }
}