import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonCard,
  IonInput,
  IonButton,
} from "@ionic/react";
import { AppContext } from "./AppContextProvider";

export function Item({ elem, index }) {
  const { updateQ, wrongCounts } = useContext(AppContext);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [red, setRed] = useState(false);
  const onQuantityUpdate = useCallback(() => {
    updateQ({ ...elem, quantity: inputValue });
    console.log({ inputValue });
    setShowInput(false);
    setRed(false);
  }, [inputValue, updateQ, elem]);

  useEffect(() => {
    const res = wrongCounts.find((item) => item.code === elem.code);
    if (res){ console.log({res});setRed(true);return;}
    setRed(false);
  }, [wrongCounts, elem]);

  return (
    <IonCard key={index}>
      <IonItem
        onClick={() => {
          setShowInput((prev) => !prev);
          setRed(false);
        }}
      >
        Produs : {elem.name}
      </IonItem>
      {elem.quantity !== 0 || showInput ? (
        <IonItem>
          Quantity:
          {red ? (
            <IonInput
              type="number"
              onInput={(ev) => {
                setInputValue(parseInt(ev.target.value));
              }}
              readonly={!showInput}
              placeholder={elem.quantity}
              style={{"color":"red"}}
            />
          ) : (
            <IonInput
              type="number"
              onInput={(ev) => {
                setInputValue(parseInt(ev.target.value));
              }}
              readonly={!showInput}
              placeholder={elem.quantity}
            />
          )}
          {showInput ? (
            <IonButton onClick={onQuantityUpdate}>Save</IonButton>
          ) : null}
        </IonItem>
      ) : null}
    </IonCard>
  );
}
