import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
  } from '@react-email/components';
  
  interface VerifyEmailProps {
    userName?: string;
    verificationUrl: string;
  }
  
  const baseUrl = process.env.Node_ENV === 'development' || process.env.SERVER_URL
  ? `https://${process.env.SERVER_URL}`
  : '';
  
  
  export const VerifyEmail = ({
    userName = 'there',
    verificationUrl,
  }: VerifyEmailProps) => {
    const previewText = `Verify your email address`;
  
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="mx-auto my-auto bg-white px-2 font-sans">
            <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
              <Section className="text-center">
                <Img
                  src={`${baseUrl}/static/vercel-logo.png`}
                  width="48"
                  height="48"
                  alt="YourApp"
                  className="mx-auto my-0"
                />
              </Section>
  
              <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
                Verify your email
              </Heading>
  
              <Text className="text-[14px] text-black leading-[24px]">
                Hi {userName}, welcome to <strong>Daningatlan</strong> 👋
              </Text>
              <Text className="text-[14px] text-black leading-[24px]">
                Please verify your email address to activate your account.
              </Text>
  
              <Section className="mt-[32px] mb-[32px] text-center">
                <Button
                  className="rounded bg-[#6366f1] px-5 py-3 text-center font-semibold text-[14px] text-white no-underline"
                  href={verificationUrl}
                >
                  Verify Email 
                </Button>
              </Section>
  
              <Text className="text-[14px] text-black leading-[24px]">
                Or copy and paste this URL into your browser:
                <br />
                <Link href={verificationUrl} className="text-blue-600 break-words">
                  {verificationUrl}
                </Link>
              </Text>
      
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  VerifyEmail.PreviewProps = {
    userName: 'John Doe',
    verificationUrl: 'https://example.com/verify',
  } as VerifyEmailProps;
  export default VerifyEmail;