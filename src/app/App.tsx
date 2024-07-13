import React from "react";
import { Provider } from "react-redux";

import { store } from "src/app/model/store";
import { Wrapper } from "src/pages/Wrapper/Wrapper";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Wrapper />
    </Provider>
  );
};
