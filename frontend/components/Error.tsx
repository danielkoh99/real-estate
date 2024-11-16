import { Card } from "@nextui-org/react";

function Error({ error_message }: { error_message: string }) {
  return (
    <Card className="flex flex-col p-4">
      <div>{error_message || "Unknown error"}</div>
    </Card>
  );
}

export default Error;
