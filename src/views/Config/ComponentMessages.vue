<template>
  <div>
      <div>
        <el-alert
          class="alert"
          :closable="false"
          v-for="(response, i) in responses"
          :key="i"
          :title="response.message"
          :type="response.type">
            <p style="margin-bottom: 0;" v-for="(message, index) in response.messages" :key="index">{{message}}</p>
        </el-alert>
      </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { EStandardEdgeStatus, TStandardEdgeResponse } from '@locational/config-validation/build/module/lib/TStandardEdgeResponse';
  import { ECustomEdgeStatus } from '@locational/config-validation/build/module/lib/TCustomEdgeResponse';

  const debug_options = {
    all: [EStandardEdgeStatus.Red, EStandardEdgeStatus.Green, EStandardEdgeStatus.Blue],
    warnings_errors: [EStandardEdgeStatus.Red, EStandardEdgeStatus.Blue],
    errors: [EStandardEdgeStatus.Red]
  }

  const debug_level: Array<EStandardEdgeStatus> = debug_options.errors

  function get_type(status: EStandardEdgeStatus): string {
    switch (status) {
      case EStandardEdgeStatus.Red:
        return 'error'
      case EStandardEdgeStatus.Blue:
        return 'warning'
      case EStandardEdgeStatus.Green:
        return 'success'
        
      default:
        return 'warning'
    }
  }

  export default Vue.extend({
    props: {
      node_name: String,
      validation_result: Object,
    },
    watch: {
      validation_result(validation_result) {
        console.log('validation_result', validation_result);
      }
    },
    computed: {
      responses() {
        if (!this.validation_result) return []

        const edge_messages: TStandardEdgeResponse[] = this.validation_result.edge_messages.filter((edge: TStandardEdgeResponse) => {
          return debug_level.some(level => level === edge.status)
        })

        const relevant_responses: TStandardEdgeResponse[] = edge_messages.filter((result: any) => {
          return result.source_node_name == this.node_name || result.target_node_name == this.node_name
        })

        return relevant_responses.map((response: TStandardEdgeResponse) => {
          const messages = response.custom_edge_responses.filter((r) => r.status === ECustomEdgeStatus.Red).map(r => r.message)
          return {
            type: get_type(response.status),
            message: response.message,
            messages
          }
        })
      },
    },
  });
</script>

<style scoped>
  .alert {
    margin-bottom: 0.5em;
  }
</style>