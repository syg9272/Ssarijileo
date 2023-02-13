package com.ssafy.ssarijileo.api.singingcontest.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.ssafy.ssarijileo.common.redis.RedisBase;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.ssafy.ssarijileo.api.recording.entity.Recording;
import com.ssafy.ssarijileo.api.recording.repository.RecordingJpaRepository;
import com.ssafy.ssarijileo.api.singingcontest.dto.SingingContestResponseDto;
import com.ssafy.ssarijileo.api.singingcontest.dto.SingingContestUpdateDto;
import com.ssafy.ssarijileo.api.singingcontest.entity.SingingContest;
import com.ssafy.ssarijileo.api.singingcontest.repository.SingingContestJpaRepository;
import com.ssafy.ssarijileo.common.exception.NotFoundException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
@Slf4j
public class SingingContestServiceImpl implements SingingContestService{

	private final SingingContestJpaRepository singingContestJpaRepository;
	private final RecordingJpaRepository recordingJpaRepository;
	private final LikeService likeService;

	@Override
	public List<SingingContestResponseDto> findAllSingingContest(String userId) {
		List<SingingContestResponseDto> list = singingContestJpaRepository.findByStatus("V").orElseThrow(NumberFormatException::new)
				.stream().map(SingingContest::toDto).collect(Collectors.toList());

		for (SingingContestResponseDto dto : list) {
			Long singingContestId = dto.getSingingContestId();
			dto.setLikeCount(likeService.getLikeCount(singingContestId));
			dto.setLike(likeService.hasLiked(userId, singingContestId));
		}
		return list;
	}

	@Override
	public List<SingingContestResponseDto> findSingingContestByUserId(String userId) {
		List<SingingContestResponseDto> list = singingContestJpaRepository.findByRecording_Profile_ProfileIdAndStatus(userId, "V").orElseThrow(NumberFormatException::new)
				.stream().map(SingingContest::toDto).collect(Collectors.toList());

		for (SingingContestResponseDto dto : list) {
			Long singingContestId = dto.getSingingContestId();
			dto.setLikeCount(likeService.getLikeCount(singingContestId));
			dto.setLike(likeService.hasLiked(userId, singingContestId));
		}
		return list;
	}

	@Override
	public void insertSingingContest(Long recordingId) {
		Recording recording = recordingJpaRepository.findById(recordingId).orElseThrow(NotFoundException::new);
		SingingContest singingContest = SingingContest.builder().recording(recording).build();
		singingContestJpaRepository.save(singingContest);
	}

	@Override
	public void updateSingingContest(SingingContestUpdateDto singingContestUpdateDto) {
		SingingContest singingContest = singingContestJpaRepository.findById(
			singingContestUpdateDto.getSingingContestId()).orElseThrow(NotFoundException::new);
		singingContest.updateStatus(singingContestUpdateDto.getStatus());
	}
}
