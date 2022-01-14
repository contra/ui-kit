export type ToastType =
  | 'content'
  | 'error'
  | 'info'
  | 'loading'
  | 'success'
  | 'warning';

export type Renderable = JSX.Element | number | string | null;

export type ValueFunction<TValue, TArgument> = (argument: TArgument) => TValue;
export type ValueOrFunction<TValue, TArgument> =
  | TValue
  | ValueFunction<TValue, TArgument>;

export type Toast = {
  ariaLive: 'assertive' | 'off' | 'polite';
  createdAt: number;
  /**
   * Duration of time in milliseconds before being dismissed automatically.
   */
  duration?: number;
  height?: number;
  hideIcon?: boolean;
  icon?: Renderable;
  id: string;
  isRelative?: boolean;
  message: ValueOrFunction<Renderable, Toast>;
  pauseDuration: number;
  role: 'alert' | 'status';
  type: ToastType;
  visible: boolean;
};

export type ToastOptions = Partial<
  Pick<Toast, 'ariaLive' | 'duration' | 'hideIcon' | 'icon' | 'id' | 'role'>
>;

export type DefaultToastOptions = ToastOptions & {
  [key in ToastType]?: ToastOptions;
};

export type Message = ValueOrFunction<Renderable, Toast>;

export type ToastHandler = (message: Message, options?: ToastOptions) => string;

type ToastUtilityMethods = {
  [key in Exclude<ToastType, 'info'>]: ToastHandler;
};

export type ToastUtility = ToastHandler &
  ToastUtilityMethods & {
    /**
     * Dismisses a specific toast if `toastId` is provided, otherwise dismisses all toasts.
     *
     * Dismissing animates the toast away and will be removed automatically.
     */
    dismiss: (toastId?: string) => void;
    /**
     * Allows you to show loading, success, and error states for a single toast
     * given a promise to track.
     */
    promise: <T>(
      promise: Promise<T>,
      msgs: {
        error: ValueOrFunction<Renderable, unknown>;
        loading: Renderable;
        success: ValueOrFunction<Renderable, T>;
      },
      options?: DefaultToastOptions
    ) => Promise<T>;
    /**
     * Removes a specific toast if `toastId` is provided, otherwise removes all toasts.
     *
     * Removing a toast means it will not animate out.
     */
    remove: (toastId?: string) => void;
  };
