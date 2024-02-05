import { useEffect } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

const userId = "조예진";
const SubscribeTestPage = () => {
  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const eventSource = new EventSource(
      `https://i10a701.p.ssafy.io/api/message/alert/subscribe/${userId}`,
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

    return () => {
      eventSource.close();
      console.log("SSE CLOSED");
    };
  }, []);
}

export default SubscribeTestPage