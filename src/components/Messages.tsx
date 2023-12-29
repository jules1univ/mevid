import {
  Button,
  Card,
  CardHeader,
  Divider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Input,
  Persona,
} from "@fluentui/react-components";
import { Dismiss24Regular, Send16Regular } from "@fluentui/react-icons";
import { FC } from "react";
import { useUserContext } from "../hooks/useUserContext";

const Message = ({ username, content }: MessageData) => {
  return (
    <Card style={{ boxShadow: "none" }}>
      <CardHeader
        header={<Persona textAlignment="start" name={username} />}
        description={<p>{content}</p>}
      />
    </Card>
  );
};

const MessagesDrawer: FC<MessagesDrawerProps> = ({
  state,
  messages,
  dispatch,
}) => {
  const { storage } = useUserContext();
  return (
    <Drawer
      type={"overlay"}
      separator
      open={state.messageModal}
      size="small"
      position={storage.message.rightDirection ? "end" : "start"}
      onOpenChange={(_, { open }) =>
        dispatch({ type: "messageModal", payload: open })
      }
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => dispatch({ type: "messageModal", payload: false })}
            />
          }
        >
          Messages
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className="chat-content">
        <div className="chat">
          <div className="chat-messages">
            {messages &&
              messages.map((message, i) => (
                <>
                  <Message
                    username={message.username}
                    content={message.content}
                    key={i}
                  />
                  <Divider key={i + 1} />
                </>
              ))}
          </div>
          <div className="chat-input">
            <Input size="large" />
            <Button
              appearance="primary"
              iconPosition="after"
              icon={<Send16Regular />}
              size="large"
            />
          </div>
        </div>
      </DrawerBody>
    </Drawer>
  );
};

export default MessagesDrawer;
