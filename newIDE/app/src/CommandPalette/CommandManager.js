// @flow
import { type MessageDescriptor } from '../Utils/i18n/MessageDescriptor.flow';

type CommandHandler = () => void | Promise<void>;

export type SimpleCommand = {|
  displayText: MessageDescriptor,
  enabled: boolean,
  handler: CommandHandler,
|};

export type CommandOption<T> = {|
  value: T,
  handler: CommandHandler,
  text: string,
  iconSrc?: string,
|};

export type CommandWithOptions<T> = {|
  displayText: MessageDescriptor,
  enabled: boolean,
  generateOptions: () => Array<CommandOption<T>>,
|};

export type Command = SimpleCommand | CommandWithOptions<*>;

export type NamedCommand = {|
  name: string,
  ...Command,
|};

export type NamedCommandWithOptions<T> = {|
  name: string,
  ...CommandWithOptions<T>,
|};

export default class CommandManager {
  commands: { [string]: Command };
  _isScoped: boolean;

  constructor(scoped: ?boolean) {
    this.commands = {};
    this._isScoped = scoped || false;
  }

  registerCommand = (commandName: string, command: Command) => {
    if (this.commands[commandName])
      return console.warn(
        `Tried to register command ${commandName}, but it is already registered.`
      );
    this.commands[commandName] = command;
  };

  deregisterCommand = (commandName: string) => {
    if (!this.commands[commandName])
      return console.warn(
        `Tried to deregister command ${commandName}, but it is not registered.`
      );
    delete this.commands[commandName];
  };

  getAllNamedCommands = () => {
    return Object.keys(this.commands).map<NamedCommand>(commandName => {
      const cmd = this.commands[commandName];
      return { ...cmd, name: commandName };
    });
  };
}
