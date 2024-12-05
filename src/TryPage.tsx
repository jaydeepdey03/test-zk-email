/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
// disable eslint for this file,

import {
  ZkEmailSDKProvider,
  useGoogleAuth,
  useZkEmailSDK,
} from "@zk-email/zk-email-sdk";

import {useState} from "react";

type Props = {
  // Define the properties of Props here
};

const GOOGLE_CLIENT_ID = "";

export function Page(props: Props) {
  const {
    googleAuthToken,
    isGoogleAuthed,
    loggedInGmail,
    googleLogIn,
    googleLogOut,
  } = useGoogleAuth();

  const {
    createInputWorker,
    generateInputFromEmail,
    generateProofRemotely,
    proofStatus,
    inputWorkers,
  } = useZkEmailSDK();

  const [externalInputs, setExternalInputs] = useState<Record<string, string>>(
    {}
  );

  // externalInputs - External inputs added when submitting a new pattern at https://registry-dev.zkregex.com/submit
  //   const entryExternalInputs = externalInputs as {name: string, maxLength: number}[] || [];
  const entryExternalInputs: {name: string; maxLength: number}[] = [];

  console.log(entryExternalInputs, "entryExternalInputs");
  for (const input of entryExternalInputs) {
    setExternalInputs({
      ...externalInputs,
      [input.name]: "",
    });
  }

  const generateInputFromEmailFunc = async () => {
    if (loggedInGmail) {
      try {
        const input = await generateInputFromEmail(
          "phil/x-domain",
          loggedInGmail,
          externalInputs
        );

        console.log(input, "input");

        const proofRes = await generateProofRemotely("phil/x-domain", input);

        console.log(proofRes);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("loggedInGmail is null");
    }
  };

  const consoleFunc = () => {
    console.log("Testing");

    console.log(proofStatus);
    console.log(inputWorkers);
  };

  return (
    <div>
      {/* Add your JSX here */}
      hello --
      {isGoogleAuthed ? (
        <div>
          <h1>Logged in as {loggedInGmail}</h1>
        </div>
      ) : (
        <div>
          <h1>Not logged in</h1>
        </div>
      )}
      {isGoogleAuthed ? (
        <button onClick={googleLogOut}>Log out</button>
      ) : (
        <button onClick={googleLogIn}>Log in</button>
      )}
      <button
        onClick={() => {
          console.log("calling");
          createInputWorker("phil/x-domain");
        }}
      >
        Create Input Worker
      </button>
      <button onClick={generateInputFromEmailFunc}>
        {" "}
        Generate Input from Email
      </button>
      <button onClick={consoleFunc}>Console</button>
    </div>
  );
}

export default function TryPage(props: Props) {
  return (
    <ZkEmailSDKProvider
      clientId={GOOGLE_CLIENT_ID}
      zkEmailSDKRegistryUrl="https://registry-dev.zkregex.com"
    >
      <Page {...props} />
    </ZkEmailSDKProvider>
  );
}
