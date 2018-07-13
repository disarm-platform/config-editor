<template>
  <div>
    {{messages}}
      <!-- <div>
        <el-alert
          class="alert"
          :closable="false"
          v-for="(s, i) in success"
          :key="i"
          :title="s.message"
          type="success">
        </el-alert>
      </div>
      
      <div>
        <el-alert
          class="alert"
          :closable="false"
          v-for="(w, i) in warnings"
          :key="i"
          :title="w.message"
          type="warning">
        </el-alert>
      </div>

      <div>
        <el-alert
          class="alert"
          :closable="false"
          v-for="(e, i) in errors"
          :key="i"
          :title="e.message"
          type="error">
        </el-alert>
      </div> -->
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
      messages() {
        if (!this.validation_result) return []

        const edge_messages: TStandardEdgeResponse[] = this.validation_result.edge_messages.filter((edge: TStandardEdgeResponse) => {
          return debug_level.some(level => level === edge.status)
        })

        const relevant_responses: TStandardEdgeResponse[] = edge_messages.filter((result: any) => {
          return result.source_node_name == this.node_name || result.target_node_name == this.node_name
        })

        console.log('relevant_responses', relevant_responses);

        return relevant_responses.map((response: TStandardEdgeResponse) => {
          const messages = response.custom_edge_responses.filter((r) => r.status === ECustomEdgeStatus.Red).map(r => r.message)
          return {
            message: response.message,
            messages
          }
        })

      }
    }
  });
</script>

<style scoped>
  .alert {
    margin-bottom: 0.5em;
  }
</style>