package com.ssafy.ssarijileo.api.friend.repository;

import java.time.Duration;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ssafy.ssarijileo.api.friend.dto.FriendDto;
import com.ssafy.ssarijileo.common.redis.RedisBase;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class FriendRedisRepository {

	private final RedisBase redisBase;

	private static final Duration TTL = Duration.ofDays(1);

	public void set(String key, FriendDto value) {
		redisBase.set(getKey(key), value, TTL);
	}

	public Optional<FriendDto> get(String key) {
		return redisBase.get(getKey(key), FriendDto.class);
	}

	public void remove(String key) {
		redisBase.remove(getKey(key));
	}

	public String getKey(String userId) {
		return "user_" + userId;
	}
}