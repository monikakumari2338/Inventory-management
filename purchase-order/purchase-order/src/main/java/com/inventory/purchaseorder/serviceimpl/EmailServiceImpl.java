package com.inventory.purchaseorder.serviceimpl;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import com.inventory.purchaseorder.entity.EmailRequest;
import com.inventory.purchaseorder.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public void sendEmail(EmailRequest emailRequest) {

		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper1;
		try {
			helper1 = new MimeMessageHelper(message, true);

			helper1.setFrom("monika@gmail.com");
			helper1.setTo(emailRequest.getRecipient());
			helper1.setText(emailRequest.getMsgBody());
			helper1.setSubject(emailRequest.getSubject());

			InputStreamSource source = new ByteArrayResource(emailRequest.getAttachment().getBytes());

			helper1.addAttachment("Todayscycle Report.pdf", source);
			javaMailSender.send(message);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();
		}

	}

	@Override
	public void sendDiscrepancyEmail(EmailRequest emailRequest) {

		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper1;
		try {
			helper1 = new MimeMessageHelper(message, true);

			helper1.setFrom("monika@gmail.com");
			helper1.setTo(emailRequest.getRecipient());
			helper1.setText(emailRequest.getMsgBody());
			helper1.setSubject(emailRequest.getSubject());

			InputStreamSource source = new ByteArrayResource(emailRequest.getAttachment().getBytes());

			helper1.addAttachment("PO Discrepancy Report.pdf", source);
			javaMailSender.send(message);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();
		}

	}
}
