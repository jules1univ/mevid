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
import {
  Dismiss24Regular,
  Send16Regular,
} from "@fluentui/react-icons";
import { FC } from "react";

type MessageData = {
  username: string;
  content: string;
};

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

type MessagesDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  messages?: MessageData[];
};

const MessagesDrawer: FC<MessagesDrawerProps> = ({
  messages,
  open,
  setOpen,
}) => {
  return (
    <Drawer
      type={"overlay"}
      separator
      open={open}
      size="small"
      position="start"
      onOpenChange={(_, { open }) => setOpen(open)}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => setOpen(false)}
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
            <Input />
            <Button
              appearance="primary"
              iconPosition="after"
              icon={<Send16Regular />}
            >
              Send
            </Button>
          </div>
        </div>
      </DrawerBody>
    </Drawer>
  );
};

export default MessagesDrawer;
