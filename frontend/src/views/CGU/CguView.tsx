import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function CguView() {
  return (
    <Container fixed >
      <Box sx={{ margin: "100px" }}>
        <Typography variant="h3" gutterBottom>
          Terms and Conditions ⚖️
        </Typography>
        <Typography variant="h6" gutterBottom>
          1. Introduction
        </Typography>
        <Typography variant="body1" gutterBottom>
          These Website Standard Terms and Conditions (these "Terms" or "Agreement") contained herein on this webpage shall govern your use of our website (the "Website"), including all pages within this Website. These terms apply in full force and
          effect to your use of this Website and by using this Website, you expressly accept all terms and conditions contained herein in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not
          use this Website.
        </Typography>
        <Typography variant="h6" gutterBottom>
          2. Intellectual Property Rights
        </Typography>
        <Typography variant="body1" gutterBottom>
          Unless otherwise stated, we or our licensors own the intellectual property rights in the website and material on the website. All these intellectual property rights are reserved.
        </Typography>
        <Typography variant="h6" gutterBottom>
          3. Restrictions
        </Typography>
        <Typography variant="body1" gutterBottom>
          You are expressly and emphatically restricted from all of the following:
        </Typography>
        <ul>
          <Typography component="li" variant="body1">
            publishing any Website material in any media;
          </Typography>
          <Typography component="li" variant="body1">
            selling, sublicensing and/or otherwise commercializing any Website material;
          </Typography>
          <Typography component="li" variant="body1">
            publicly performing and/or showing any Website material;
          </Typography>
          <Typography component="li" variant="body1">
            using this Website in any way that is, or may be, damaging to this Website or detrimental to the interests of this Website;
          </Typography>
          <Typography component="li" variant="body1">
            using this Website in any way that impacts user access to this Website;
          </Typography>
          <Typography component="li" variant="body1">
            using this Website contrary to applicable laws and regulations, or in a way that causes, or may cause, harm to the Website, or to any person or business entity;
          </Typography>
          <Typography component="li" variant="body1">
            engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;
          </Typography>
          <Typography component="li" variant="body1">
            using this Website to engage in any advertising or marketing.
          </Typography>
        </ul>
        <Typography variant="h6" gutterBottom>
          4. User Content
        </Typography>
        <Typography variant="body1" gutterBottom>
          <Typography variant="body1" gutterBottom>
            a. You grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use any content that you submit, publish or display on or through this Website ("User Content").
          </Typography>
          <Typography variant="body1" gutterBottom>
            b. You are solely responsible for the accuracy, quality, completeness, legality, reliability, appropriateness, and intellectual property ownership or right to use of all User Content that you submit, publish or display on or through this
            Website.
          </Typography>
          <Typography variant="h6" gutterBottom>
            5. No Warranties
          </Typography>
          <Typography variant="body1" gutterBottom>
            This Website is provided "as is," with all faults, and we make no express or implied representations or warranties, of any kind related to this Website or the materials contained on this Website. Additionally, nothing contained on this
            Website shall be construed as providing consult or advice to you.
          </Typography>
          <Typography variant="h6" gutterBottom>
            6. Limitation of Liability
          </Typography>
          <Typography variant="body1" gutterBottom>
            In no event shall we or any of our officers, directors, and employees be liable to you for anything arising out of or in any way connected with your use of this Website, whether such liability is under contract, tort or otherwise, and we
            shall not be liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
          </Typography>
          <Typography variant="h6" gutterBottom>
            7. Indemnification
          </Typography>
          <Typography variant="body1" gutterBottom>
            You agree to indemnify and hold harmless us, our affiliates, and their respective officers, directors, employees, and agents from and against any claims, actions, suits or proceedings, as well as any and all losses, liabilities, damages,
            costs and expenses (including reasonable attorney fees) arising out of or in any way connected with your use of this Website, your User Content or your breach of these Terms.
          </Typography>
          <Typography variant="h6" gutterBottom>
            8. Termination
          </Typography>
          <Typography variant="body1" gutterBottom>
            We may terminate or suspend access to our Website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should
            survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
          </Typography>
          <Typography variant="h6" gutterBottom>
            9. Governing Law
          </Typography>
          <Typography variant="body1" gutterBottom>
            These Terms shall be governed and construed in accordance with the laws of [INSERT YOUR JURISDICTION], without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the
            exclusive jurisdiction of the courts located in [INSERT YOUR JURISDICTION].
          </Typography>
          <Typography variant="h6" gutterBottom>
            10. Changes to the Terms
          </Typography>
          <Typography variant="body1" gutterBottom>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least [INSERT NOTICE PERIOD] days' notice prior to any new terms taking effect. What constitutes a
            material change will be determined at our sole discretion.
          </Typography>
          <Typography variant="h6" gutterBottom>
            11. Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            If you have any questions about these Terms, please contact us at [INSERT YOUR CONTACT INFORMATION].
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
}
