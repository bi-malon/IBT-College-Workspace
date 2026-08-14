async function testErrorHandling() {
  console.log("--- Test A: Broken URL Domain ---");
  try {
    await fetch("https://this-domain-does-not-exist-12345.com");
  } catch (err) {
    console.log("Caught network failure:", err.message);
  }

  console.log("\n--- Test B: Real URL returning HTTP 404 ---");
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/non-existent-endpoint",
    );

    console.log(`res.ok is: ${res.ok}`);
    console.log(`res.status is: ${res.status}`);

    if (!res.ok) {
      throw new Error(`Server returned status ${res.status} (Not Found)`);
    }

    const data = await res.json();
  } catch (err) {
    console.log("Caught HTTP Error via res.ok:", err.message);
  }
}

testErrorHandling();
