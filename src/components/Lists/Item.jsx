import React, { useEffect, useState } from "react";
import { IonCard, IonItem } from "@ionic/react";

export function Item({ elem }) {
  const [showBold, setShowBold] = useState(true);

  useEffect(() => {
    setShowBold(true);
    setTimeout(() => {
      setShowBold(false);
    }, 1000);
  }, [elem]);

  return elem ? (
    <>
      <IonCard>
        {Object.entries(elem).map(([key, value], index) => (
          <IonItem key={index}>
            {showBold ? (
              <strong>
                {key}: {value.toString()}
              </strong>
            ) : (
              <p>
                {key}: {value.toString()}
              </p>
            )}
          </IonItem>
        ))}
      </IonCard>
    </>
  ) : null;
}
