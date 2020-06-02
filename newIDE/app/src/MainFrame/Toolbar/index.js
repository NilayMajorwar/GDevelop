// @flow
import { t } from '@lingui/macro';
import React, { PureComponent } from 'react';
import { Toolbar, ToolbarGroup } from '../../UI/Toolbar';
import ToolbarIcon from '../../UI/ToolbarIcon';
import ToolbarSeparator from '../../UI/ToolbarSeparator';
import ElementWithMenu from '../../UI/Menu/ElementWithMenu';
import Window from '../../Utils/Window';
import PreviewButtons, { type PreviewButtonsProps } from './PreviewButtons';

type Props = {|
  showProjectIcons: boolean,
  hasProject: boolean,
  toggleProjectManager: () => void,
  requestUpdate: ?() => void,
  simulateUpdateDownloaded: ?() => void,
  simulateUpdateAvailable: ?() => void,
  openCmdPalette: () => void,
  exportProject: () => void,
  ...PreviewButtonsProps,
|};

type State = {|
  editorToolbar: any,
|};

export class MainFrameToolbar extends PureComponent<Props, State> {
  state = {
    editorToolbar: null,
  };

  isDev = Window.isDev();

  setEditorToolbar(editorToolbar: any) {
    this.setState({
      editorToolbar,
    });
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild>
          {this.props.showProjectIcons && (
            <ToolbarIcon
              onClick={this.props.toggleProjectManager}
              src="res/ribbon_default/projectManager32.png"
              disabled={!this.props.hasProject}
              tooltip={t`Project manager`}
            />
          )}
          {this.props.showProjectIcons && (
            <ToolbarIcon
              onClick={this.props.exportProject}
              src="res/ribbon_default/export32.png"
              disabled={!this.props.hasProject}
              tooltip={t`Export the game (Web, Android, iOS...)`}
            />
          )}
          {this.isDev && (
            <ElementWithMenu
              element={<ToolbarIcon src="res/ribbon_default/bug32.png" />}
              buildMenuTemplate={() => [
                {
                  label: 'Request update from external editor',
                  disabled: !this.props.requestUpdate,
                  click: () => {
                    this.props.requestUpdate && this.props.requestUpdate();
                  },
                },
                {
                  label: 'Simulate update downloaded',
                  disabled: !this.props.simulateUpdateDownloaded,
                  click: () => {
                    this.props.simulateUpdateDownloaded &&
                      this.props.simulateUpdateDownloaded();
                  },
                },
                {
                  label: 'Simulate update available',
                  disabled: !this.props.simulateUpdateAvailable,
                  click: () => {
                    this.props.simulateUpdateAvailable &&
                      this.props.simulateUpdateAvailable();
                  },
                },
                {
                  label: 'Open command palette',
                  disabled: false,
                  click: () => {
                    this.props.openCmdPalette();
                  },
                },
              ]}
            />
          )}
          <ToolbarSeparator />
          <PreviewButtons
            onPreview={this.props.onPreview}
            onOpenDebugger={this.props.onOpenDebugger}
            onNetworkPreview={this.props.onNetworkPreview}
            setPreviewOverride={this.props.setPreviewOverride}
            showNetworkPreviewButton={this.props.showNetworkPreviewButton}
            isPreviewEnabled={this.props.isPreviewEnabled}
            previewState={this.props.previewState}
          />
        </ToolbarGroup>
        {this.state.editorToolbar || <ToolbarGroup />}
      </Toolbar>
    );
  }
}

export default MainFrameToolbar;
