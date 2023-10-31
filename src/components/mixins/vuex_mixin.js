import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState({ m_dataList: "dataList" }),
    ...mapGetters({ m_dataDisList: "dataDisList" }),
    m_step() {
      return this.$store.state[this.moduleName].step;
    },
    m_taskName() {
      return this.$store.state[this.moduleName].taskName;
    },
    m_principal() {
      return this.$store.state[this.moduleName].principal;
    },
    m_participants() {
      return this.$store.state[this.moduleName].participants;
    },
    m_disease() {
      return this.$store.state[this.moduleName].disease;
    },
    m_dataset() {
      return this.$store.state[this.moduleName].dataset;
    },
    m_use_features() {
      return this.$store.state[this.moduleName].use_features;
    },
    m_known_features() {
      return this.$store.state[this.moduleName].known_features;
    },
    m_target_feature() {
      return this.$store.state[this.moduleName].target_feature;
    },
    m_algorithm() {
      return this.$store.state[this.moduleName].algorithm;
    },
    m_SF_DRMB() {
      return this.$store.state[this.moduleName].SF_DRMB;
    },
    m_result() {
      return this.$store.state[this.moduleName].result;
    },
  },
  methods: {
    m_changeStep(newStep) {
      this.$store.commit(`${this.moduleName}/ChangeStep`, newStep);
    },
    m_changeTaskInfo(newValue) {
      this.$store.commit(`${this.moduleName}/ChangeTaskInfo`, newValue);
    },
    m_SF_DRMB_update(newdata) {
      this.$store.commit(`${this.moduleName}/SF_DRMB_update`, newdata);
    },
  },
};
