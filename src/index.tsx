import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BbbPluginSdk, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import PickRandomUserPlugin from './components/pick-random-user/component';
import { useInjectIntl } from './hooks/injectIntl';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

function PluginInitializer({ pluginUuid }: { pluginUuid: string }): React.ReactNode {
  BbbPluginSdk.initialize(pluginUuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(pluginUuid);
  const IntlInjectedPickRandomUserPlugin = useInjectIntl(PickRandomUserPlugin, pluginApi);

  return (<IntlInjectedPickRandomUserPlugin />);
}

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <React.StrictMode>
    <PluginInitializer pluginUuid={uuid} />
  </React.StrictMode>,
);
