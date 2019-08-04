import React, { useState } from 'react';

export interface InputHandlerParam {
  name: string;
  onChange: (e: React.ChangeEvent<InputElement>) => void;
  value: InputValue;
}

type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type InputValue = string | number | string[] | undefined;
type FormHandler<T> = {
  [K in keyof T]: InputHandlerParam;
};

const useFormHandler = <T extends Record<string, InputValue>>(
  initial: T,
): [T, FormHandler<T>, boolean] => {
  const [formState, setFormState] = useState(initial);
  const [isModified, setIsModified] = useState(false);

  const handler = (e: React.ChangeEvent<InputElement>): void => {
    const { target } = e;

    setFormState(
      (formStateBefore: T): T => ({
        ...formStateBefore,
        [target.name]: target.value,
      }),
    );
    setIsModified(true);
  };

  const formHandler = Object.keys(initial).reduce<FormHandler<T>>(
    (prev: FormHandler<T>, cur: keyof T): FormHandler<T> => {
      prev[cur] = {
        name: cur.toString(),
        onChange: handler,
        value: formState[cur],
      };
      return prev;
    },
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    {} as FormHandler<T>,
  );

  return [formState, formHandler, isModified];
};

export default useFormHandler;
