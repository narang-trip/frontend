import { Fragment, useEffect } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

const userId = "구본승";
const SubscribeTestPage = () => {
  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const eventSource = new EventSource(
      `${import.meta.env.VITE_ALERT_REQUEST_URI}/subscribe/${userId}`,
      {
        heartbeatTimeout: 3600000,
      }
    );
    
    eventSource.addEventListener("sse", (event) => {
      const { data: receivedConnectData } = event;
      console.log(receivedConnectData);
      if (receivedConnectData === "SSE 연결이 완료되었습니다.") {
        // "SSE connection has been completed."
        console.log("SSE CONNECTED");
      } else {
        console.log(event);
      }
    });
    eventSource.onerror = function(event) {
      console.error("SSE 에러 발생:", event);
    };

    return () => {
      eventSource.close();
      console.log("SSE CLOSED");
    };
  }, []);
  return <Fragment>
    <h1>서브스크라이브 테스트 중 제대로 되면 로그에 무언가 떠야합니다.</h1>
  </Fragment>
}

export default SubscribeTestPage