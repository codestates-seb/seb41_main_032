package mainproject.stocksite.domain.member.mapper;

import javax.annotation.processing.Generated;
import mainproject.stocksite.domain.member.dto.MemberPatchDto;
import mainproject.stocksite.domain.member.dto.MemberPostDto;
import mainproject.stocksite.domain.member.dto.MemberResponseDto;
import mainproject.stocksite.domain.member.entity.Member;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-31T12:43:57+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.4.jar, environment: Java 11.0.15.1 (Oracle Corporation)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToEntity(MemberPostDto memberPostDto) {
        if ( memberPostDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setUsername( memberPostDto.getUsername() );
        member.setPassword( memberPostDto.getPassword() );
        member.setNickname( memberPostDto.getNickname() );
        member.setEmail( memberPostDto.getEmail() );

        return member;
    }

    @Override
    public MemberResponseDto memberToResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberResponseDto memberResponseDto = new MemberResponseDto();

        memberResponseDto.setCreatedAt( member.getCreatedAt() );
        memberResponseDto.setModifiedAt( member.getModifiedAt() );
        memberResponseDto.setMemberId( member.getMemberId() );
        memberResponseDto.setUsername( member.getUsername() );
        memberResponseDto.setPassword( member.getPassword() );
        memberResponseDto.setNickname( member.getNickname() );
        memberResponseDto.setEmail( member.getEmail() );
        memberResponseDto.setMoney( member.getMoney() );

        return memberResponseDto;
    }

    @Override
    public Member memberPatchDtoToEntity(MemberPatchDto memberPatchDto) {
        if ( memberPatchDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setUsername( memberPatchDto.getUsername() );
        member.setPassword( memberPatchDto.getPassword() );
        member.setNickname( memberPatchDto.getNickname() );
        member.setEmail( memberPatchDto.getEmail() );

        return member;
    }
}
