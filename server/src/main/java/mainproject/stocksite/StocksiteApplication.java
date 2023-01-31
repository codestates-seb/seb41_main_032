package mainproject.stocksite;

import mainproject.stocksite.global.config.OpenApiSecretInfo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableJpaAuditing
@EnableConfigurationProperties(OpenApiSecretInfo.class)
@SpringBootApplication
public class StocksiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(StocksiteApplication.class, args);
	}
}
