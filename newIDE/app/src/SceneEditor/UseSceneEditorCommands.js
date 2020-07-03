// @flow
import { t } from '@lingui/macro';
import { useCommandWithOptions } from '../CommandPalette/CommandHooks';
import { type CommandOption } from '../CommandPalette/CommandManager';
import { enumerateObjects } from '../ObjectsList/EnumerateObjects';
import ObjectsRenderingService from '../ObjectsRendering/ObjectsRenderingService';

const editObjectCommandText = t`Edit object...`;
const editObjectVariablesCommandText = t`Edit object variables...`;

/**
 * Helper function to generate options list
 */
const generateLayoutObjectsOptions = (
  project: gdProject,
  layout: gdLayout,
  onChoose: (object: gdObject) => void
): Array<CommandOption<gdObject>> => {
  return enumerateObjects(project, layout).containerObjectsList.map(item => ({
    text: item.object.getName(),
    value: item.object,
    handler: () => onChoose(item.object),
    iconSrc: ObjectsRenderingService.getThumbnail.bind(ObjectsRenderingService)(
      project,
      item.object
    ),
  }));
};

type Props = {
  project: gdProject,
  layout: gdLayout,
  onEditObject: (object: gdObject) => void,
  onEditObjectVariables: (object: gdObject) => void,
};

const UseSceneEditorCommands = (props: Props) => {
  const { project, layout, onEditObject, onEditObjectVariables } = props;

  useCommandWithOptions('EDIT_OBJECT', {
    displayText: editObjectCommandText,
    enabled: true,
    generateOptions: () =>
      generateLayoutObjectsOptions(project, layout, onEditObject),
  });

  useCommandWithOptions('EDIT_OBJECT_VARIABLES', {
    displayText: editObjectVariablesCommandText,
    enabled: true,
    generateOptions: () =>
      generateLayoutObjectsOptions(project, layout, onEditObjectVariables),
  });

  return null;
};

export default UseSceneEditorCommands;
