package mainproject.stocksite.domain.member.mapper;

import javax.annotation.processing.Generated;
import mainproject.stocksite.domain.member.dto.MemberPatchDto;
import mainproject.stocksite.domain.member.dto.MemberPostDto;
import mainproject.stocksite.domain.member.dto.MemberResponseDto;
import mainproject.stocksite.domain.member.entity.Member;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-05T15:56:21+0900",
    comments = "version: 1.5.1.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.4.jar, environment: Java 17.0.3 (JetBrains s.r.o.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToEntity(MemberPostDto memberPostDto) {
        if ( memberPostDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setUserId( memberPostDto.getUserId() );
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

        memberResponseDto.setMemberId( member.getMemberId() );
        memberResponseDto.setUserId( member.getUserId() );
        memberResponseDto.setPassword( member.getPassword() );
        memberResponseDto.setNickname( member.getNickname() );
        memberResponseDto.setEmail( member.getEmail() );

        return memberResponseDto;
    }

    @Override
    public Member memberPatchDtoToEntity(MemberPatchDto memberPatchDto) {
        if ( memberPatchDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setUserId( memberPatchDto.getUserId() );
        member.setPassword( memberPatchDto.getPassword() );
        member.setNickname( memberPatchDto.getNickname() );
        member.setEmail( memberPatchDto.getEmail() );

        return member;
    }
}
