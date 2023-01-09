package mainproject.stocksite.domain.member.controller;


import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.member.dto.MemberPatchDto;
import mainproject.stocksite.domain.member.dto.MemberPostDto;
import mainproject.stocksite.domain.member.dto.MemberResponseDto;
import mainproject.stocksite.domain.member.entity.Member;
import mainproject.stocksite.domain.member.mapper.MemberMapper;
import mainproject.stocksite.domain.member.service.MemberService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Validated
public class MemberController {

    private final MemberService service;

    private final MemberMapper mapper;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public MemberResponseDto post(@Valid @RequestBody MemberPostDto memberPostDto) {
        Member member = mapper.memberPostDtoToEntity(memberPostDto);
        Member addMember = service.addMember(member);
        MemberResponseDto memberResponseDto = mapper.memberToResponseDto(addMember);

        return memberResponseDto;
    }

    /**
     * GETALL 추후 불필요하다면 수정하면 될거같습니다
     */
    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<MemberResponseDto> getAll() {
        List<Member> members = service.getMembers();
        return members.stream().map(member -> mapper.memberToResponseDto(member))
                .collect(Collectors.toList());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{member-id}")
    public MemberResponseDto getOne(@PathVariable("member-id") @Positive Long memberId) {
        return mapper.memberToResponseDto(service.findById(memberId));
    }

    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{member-id}")
    public MemberResponseDto patchOne(@PathVariable("member-id") @Positive Long memberId,
                                      @Valid @RequestBody MemberPatchDto memberPatchDto) {

        Member modifyMember = service.modifyMember(memberId, mapper.memberPatchDtoToEntity(memberPatchDto));
        return mapper.memberToResponseDto(modifyMember);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{member-id}")
    public void deleteUser(@PathVariable("member-id") @Positive Long memberId) {
        service.deleteMember(memberId);
    }

}
