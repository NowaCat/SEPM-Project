package rmit.assignment.tourManagementTool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class TourManagementToolApplication {

	public static void main(String[] args) {
		SpringApplication.run(TourManagementToolApplication.class, args);
	}

}
