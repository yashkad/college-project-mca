interface State {
  data: {
    selectedTheme: any;
    modalContent: any;
    modalShown: boolean;
  };
  actions: {
    setSelectedTheme: (theme) => void;
    setModal: ({ content }) => void;
    setCloseModal: () => void;
  };
}
