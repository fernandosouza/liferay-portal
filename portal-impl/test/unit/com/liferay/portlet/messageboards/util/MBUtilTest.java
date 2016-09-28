/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.portlet.messageboards.util;

import com.liferay.portal.kernel.util.StringPool;
import com.liferay.portal.util.PropsValues;

import javax.mail.Message;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.mockito.Mockito;

import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

/**
 * @author John Zhao
 */
@PrepareForTest({MBUtil.class, StringPool.class, PropsValues.class})
@RunWith(PowerMockRunner.class)
public class MBUtilTest {

	@Test
	public void testGetCategoryId() {
		Assert.assertEquals(
			10640,
			MBUtil.getCategoryId(
				"<mb_message.10640.20646.1425017183884@gmail.com>"));
	}

	@Test
	public void testGetCategoryIdWithNoSurroundingChevrons() {
		Assert.assertEquals(
			10640,
			MBUtil.getCategoryId(
				"mb_message.10640.20646.1425017183884@events.gmail.com"));
	}

	@Test
	public void testGetMessageId() {
		Assert.assertEquals(
			20646,
			MBUtil.getMessageId(
				"<mb_message.10640.20646.1425017183884@gmail.com>"));
	}

	@Test
	public void testGetMessageIdWithNoSurroundingChevrons() {
		Assert.assertEquals(
			20646,
			MBUtil.getMessageId(
				"mb_message.10640.20646.1425017183884@events.gmail.com"));
	}

	@Test
	public void testGetParentMessageIdWithTheInReplyToHeader()
		throws Exception {

		Message message = Mockito.mock(Message.class);

		Mockito.when(
			message.getHeader("In-Reply-To")
		).thenReturn(
			new String[] {"<mb_message.10640.20646.1425017183884@gmail.com>"}
		);

		Assert.assertEquals(20646, MBUtil.getParentMessageId(message));
	}

	@Test
	public void testGetParentMessageIdWithTheReferencesHeader()
		throws Exception {

		Message message = Mockito.mock(Message.class);

		Mockito.when(
			message.getHeader("References")
		).thenReturn(
			new String[] {"<mb_message.10640.20646.1425017183884@gmail.com>"}
		);

		Assert.assertEquals(20646, MBUtil.getParentMessageId(message));
	}

	@Test
	public void testGetParentMessageWithTheInReplyToHeader() throws Exception {
		Message message = Mockito.mock(Message.class);

		Mockito.when(
			message.getHeader("In-Reply-To")
		).thenReturn(
			new String[] {"<mb_message.10640.20646.1425017183884@gmail.com>"}
		);

		Assert.assertEquals(20646, MBUtil.getParentMessageId(message));
	}

}