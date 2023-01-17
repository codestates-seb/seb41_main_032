package mainproject.stocksite.domain.member.mapper;

import mainproject.stocksite.domain.member.dto.MBResponseDto;
import mainproject.stocksite.domain.member.dto.MemberPatchDto;
import mainproject.stocksite.domain.member.dto.MemberPostDto;
import mainproject.stocksite.domain.member.dto.MemberResponseDto;
import mainproject.stocksite.domain.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToEntity(MemberPostDto memberPostDto);

    MemberResponseDto memberToResponseDto(Member member);

    Member memberPatchDtoToEntity(MemberPatchDto memberPatchDto);

    MBResponseDto memberToMBResponseDto(Member member);
}
