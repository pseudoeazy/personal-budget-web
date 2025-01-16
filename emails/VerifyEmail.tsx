import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface Props {
  verifyURL: string;
}
const VerifyEmail: React.FC<Props> = ({ verifyURL }) => {
  return (
    <Html>
      <Head />
      <Preview>Monthly Budget Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={company}>Confirm your email address</Text>

          <Section style={buttonContainer}>
            <Button href={verifyURL} style={button}>
              Verify Your Email
            </Button>
          </Section>
          <Text style={paragraph}>
            If you didn't request this email, there's nothing to worry about,
            you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default VerifyEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  textAlign: 'center' as const,
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #ddd',
  borderRadius: '5px',
  marginTop: '20px',
  width: '480px',
  maxWidth: '100%',
  margin: '0 auto',
  padding: '12% 6%',
};

const company = {
  fontWeight: 'bold',
  fontSize: '18px',
  textAlign: 'center' as const,
};

const buttonContainer = {
  margin: '27px auto',
  width: 'auto',
};

const button = {
  backgroundColor: '#5e6ad2',
  borderRadius: '3px',
  fontWeight: '600',
  color: '#fff',
  textAlign: 'center' as const,
  padding: '12px 24px',
  margin: '0 auto',
};

const paragraph = {
  color: '#444',
  letterSpacing: '0',
  padding: '0 40px',
  margin: '0',
  textAlign: 'center' as const,
};
