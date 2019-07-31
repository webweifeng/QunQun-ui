import Alert from './alert/index';
import Confirm from './confirm/src';
import Notify from './notification/index';
import Prompt from './prompt/index';
import Toast from './toast/index';
import './theme-default/style/reset.scss';
const version = require('../package.json').version;
const components = [Alert, Confirm, Notify];

const install = function(Vue) {
  if (install.installed) return;
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$alert = Alert;
  Vue.prototype.$confirm = Confirm;
  Vue.prototype.$notify = Notify;
  install.installed = true;
};

export default {
  version,
  Alert,
  Confirm,
  Notify,
  Prompt,
  Toast,
  install
};
