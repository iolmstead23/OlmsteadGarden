/*
 * Created on Fri Sep 20 2024
 * Author: Ian Olmstead
 *
 * License: GNU Affero General Public License (AGPL-3.0)
 *
 *For details, see https://www.gnu.org/licenses/agpl-3.0-standalone.html
 *
 *This program is free software: you can redistribute it and/or modify
 *it under the terms of the GNU Affero General Public License as published
 *by the Free Software Foundation, either version 3 of the License, or
 *(at your option) any later version.
 */

export default function Home() {
  return (
    <div className="custom-bg-background min-h-screen">
      <div className="flex flex-wrap w-5/6 flex-col gap-y-10">
        <h1 className="text-4xl font-bold custom-text">
          Welcome to the Olmstead Garden App
        </h1>
        <p className="flex flex-col gap-y-5 text-lg custom-text">
          <span>
            Garden Management Software for managing all your garden plots.
          </span>
          <span>* = Placeholder Item</span>
          <span>!! TEST MODE USING DUMMY DATA THAT HAS NOT BEEN VERIFIED. NO CONTENT WILL BE STORED IN CACHE. !!</span>
        </p>
      </div>
    </div>
  );
}
