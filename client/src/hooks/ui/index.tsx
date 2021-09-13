import React from 'react';

export interface UIContext {
  modalStatus: 'open' | 'closed';
  toggleModal: () => void;
}

const MobileContext = React.createContext<UIContext>({
  modalStatus: 'closed',
  toggleModal: () => void 0,
});

export const UIProvider: React.FunctionComponent = ({ children }) => {
  const [modalStatus, setStateModal] = React.useState<'open' | 'closed'>('closed');
  const toggleModal = React.useCallback(() => setStateModal((prev) => (prev === 'closed' ? 'open' : 'closed')), []);

  return <MobileContext.Provider value={{ modalStatus, toggleModal }}>{children}</MobileContext.Provider>;
};

export const useUiContext = () => {
  const uiContext = React.useContext(MobileContext);
  if (uiContext === undefined) {
    throw new Error('UIProvider was not found in the context');
  }

  return uiContext;
};
