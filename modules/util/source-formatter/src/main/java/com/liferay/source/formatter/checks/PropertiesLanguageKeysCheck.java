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

package com.liferay.source.formatter.checks;

import com.liferay.portal.kernel.io.unsync.UnsyncBufferedReader;
import com.liferay.portal.kernel.io.unsync.UnsyncStringReader;
import com.liferay.portal.kernel.util.ArrayUtil;

/**
 * @author Peter Shin
 */
public class PropertiesLanguageKeysCheck extends BaseFileCheck {

	@Override
	protected String doProcess(
			String fileName, String absolutePath, String content)
		throws Exception {

		if (!fileName.endsWith("/content/Language.properties")) {
			return content;
		}

		try (UnsyncBufferedReader unsyncBufferedReader =
				new UnsyncBufferedReader(new UnsyncStringReader(content))) {

			String line = null;

			while ((line = unsyncBufferedReader.readLine()) != null) {
				String[] array = line.split("=", 2);

				if (array.length < 2) {
					continue;
				}

				String key = array[0];

				if (ArrayUtil.contains(_LEGACY_LANGUAGE_KEYS, key)) {
					continue;
				}

				String value = array[1];

				if (value.matches("(?s).*<a\\b[^>]*>.*?</a>.*")) {
					addMessage(
						fileName, "Remove HTML markup for '" + key + "'",
						"language_keys.markdown",
						getLineCount(content, content.indexOf(line)));
				}
			}
		}

		return content;
	}

	private static final String[] _LEGACY_LANGUAGE_KEYS = {
		"application-adapter-help", "by-x-x",
		"check-your-email-or-configure-email-accounts",
		"click-here-to-save-it-now", "get-url", "get-url-or-webdav-url",
		"set-up-the-communication-among-the-portlets-that-use-public-render-parameters",
		"the-page-will-be-refreshed-when-you-close-this-dialog.alternatively-you-can-hide-this-dialog-x",
		"this-organization-is-already-assigned-to-password-policy-x",
		"this-user-is-already-assigned-to-password-policy-x",
		"x-added-a-comment", "xuggler-help", "uploaded-by-x-x",
		"use-my-account-to-change-regular-account-settings", "webdav-help",
		"webdav-windows-help",
		"you-are-about-to-report-a-violation-of-our-x-terms-of-use.-all-reports-are-strictly-confidential",
		"you-can-also-forcibly-disable-remote-staging",
		"you-have-to-be-signed-in-to-register-for-this-meetup"
	};

}