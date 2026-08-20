import type { Stage } from "@/course/course.schema";

export const stage37 = {
  id: "stage-37",
  number: 37,
  title: "Serialization, Compression, Archiving, and Binary Data",
  summary:
    "Master serialization, compression, archiving, and binary data through worked examples, interactive exercises, and a hands-on project.",
  level: "intermediate",
  masteryGateConceptIds: ["binary-data", "serialization", "compression"],
  lessons: [
    // ── 37.1 Binary Data Concepts ──────────────────────────────────────────
    {
      id: "s37-binary-data-concepts",
      stageId: "stage-37",
      title: "Binary Data Concepts",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Distinguish between text and binary data representations",
        "Explain what bytes, encoding, and endianness mean",
        "Identify when binary formats are preferable to text formats",
      ],
      prerequisites: [],
      concepts: ["binary-data"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Binary Data Concepts\n\n**Binary data** is a sequence of raw bytes — each byte is an integer 0–255. Unlike text files, binary files carry no implicit character encoding; their layout is determined entirely by format-specific rules.\n\nKey vocabulary:\n- **Byte** — 8 bits, values 0–255\n- **Encoding** — the mapping between bytes and characters (UTF-8, ASCII, Latin-1)\n- **Endianness** — byte order for multi-byte integers: big-endian (most significant byte first) or little-endian (least significant byte first)\n- **Serialization** — converting an in-memory object to a byte sequence\n- **Deserialization** — reconstructing an object from a byte sequence",
        },
        {
          kind: "mental-model",
          title: "Binary vs Text files",
          analogy: "Think of text files as a letter written in English — both writer and reader agree on a language (encoding). Binary files are like a blueprint drawn to exact measurements — every byte has a precise meaning defined by the format spec.",
          explanation: "When you open a binary file as text you get garbled output because Python tries to decode raw bytes as characters. You must open binary files with mode 'rb' and interpret bytes according to the format.",
        },
        {
          kind: "code",
          language: "python",
          code: `# Text vs binary file open modes
with open("data.txt", "r") as f:   # text mode: decodes bytes → str
    text = f.read()

with open("data.bin", "rb") as f:  # binary mode: raw bytes object
    raw = f.read()
    print(type(raw))   # <class 'bytes'>
    print(raw[:4])     # e.g. b'\\x89PNG'`,
          caption: "Always open binary files with 'rb' or 'wb'",
        },
        {
          kind: "callout",
          variant: "info",
          title: "Endianness matters for cross-platform data",
          body: "x86 CPUs are little-endian; network protocols use big-endian (network byte order). The `struct` module lets you specify byte order explicitly so your code works correctly on all platforms.",
        },
        {
          kind: "why-matters",
          body: "Images, audio, network packets, compiled bytecode, and many file formats store data as binary. Reading and writing them correctly requires understanding bytes, encoding, and endianness.",
        },
        {
          kind: "glossary-term",
          term: "Serialization",
          definition: "The process of converting an in-memory data structure into a sequence of bytes (or characters) that can be stored or transmitted.",
          example: "pickle.dumps(obj) serializes a Python object to bytes.",
        },
      ],
      interactions: [
        {
          id: "s37-binary-concepts-mc",
          kind: "multiple-choice",
          prompt: "Which file open mode should you use to read a PNG image file?",
          beginnerPurpose: "Confirm understanding of binary vs text open modes",
          expectedConceptIds: ["binary-data"],
          options: [
            { id: "a", text: "'r'", isCorrect: false, explanation: "Text mode tries to decode bytes as Unicode and will raise UnicodeDecodeError on binary data." },
            { id: "b", text: "'rb'", isCorrect: true, explanation: "Binary read mode returns a raw bytes object with no encoding applied." },
            { id: "c", text: "'br'", isCorrect: false, explanation: "This is not a valid Python file mode string." },
            { id: "d", text: "'bytes'", isCorrect: false, explanation: "This is not a valid Python file mode." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The letter 'b' in a mode string means binary mode. It must appear after the r/w/a character." }],
          feedback: {
            correct: "Correct! 'rb' opens the file in binary read mode, giving you raw bytes.",
            incorrect: "Remember: add 'b' to the mode string ('rb', 'wb') to work with binary files.",
          },
        },
        {
          id: "s37-binary-concepts-explain",
          kind: "plain-language-explain",
          prompt: "Explain what endianness means and why it matters when reading binary data.",
          beginnerPurpose: "Solidify the endianness concept in plain terms",
          expectedConceptIds: ["binary-data"],
          code: `import struct
value = 1000
big = struct.pack(">H", value)    # big-endian
little = struct.pack("<H", value) # little-endian
print(big.hex())    # 03e8
print(little.hex()) # e803`,
          keyPointsToHit: [
            "Endianness is the byte order for multi-byte integers",
            "Big-endian stores the most significant byte first",
            "Little-endian stores the least significant byte first",
            "Mismatching endianness causes corrupted values when reading data",
          ],
          sampleAnswer: "Endianness describes which byte of a multi-byte integer comes first in memory. Big-endian puts the most significant byte first (like writing '1000' left-to-right). Little-endian puts the least significant byte first. If you write data as big-endian but read it as little-endian, the number 1000 looks like a completely different value — so both sides must agree on byte order.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about how we write numbers: left digit is most significant. Now imagine storing a two-byte number — which byte do you store first?" }],
          feedback: {
            correct: "Great explanation! You clearly understand why byte order matters.",
            incorrect: "Focus on: what is endianness, and what goes wrong when producer and consumer disagree.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "binary-data", recallPrompt: "What is the difference between 'r' and 'rb' when opening a file?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-binary-concepts-mc", "s37-binary-concepts-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.2 bytes ────────────────────────────────────────────────────────
    {
      id: "s37-bytes",
      stageId: "stage-37",
      title: "The bytes Type",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create bytes literals and bytes objects from various sources",
        "Slice, index, and search bytes objects",
        "Convert between bytes and str using encode/decode",
      ],
      prerequisites: ["s37-binary-data-concepts"],
      concepts: ["binary-data"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The `bytes` Type\n\n`bytes` is an **immutable** sequence of integers 0–255. It is to binary data what `str` is to text.\n\nCreation methods:\n```python\nb = b'hello'          # literal\nb = bytes(5)          # 5 zero bytes\nb = bytes([72, 101])  # from list of ints\nb = 'hello'.encode('utf-8')  # from str\n```\n\nIndexing returns an `int`; slicing returns `bytes`.",
        },
        {
          kind: "code",
          language: "python",
          code: `data = b"Hello"
print(data[0])       # 72  (int, not bytes)
print(data[0:2])     # b'He'  (bytes slice)
print(len(data))     # 5
print(data.hex())    # '48656c6c6f'

# Convert bytes ↔ str
s = data.decode("utf-8")   # "Hello"
b = s.encode("utf-8")      # b"Hello"

# Search
print(b"ll" in data)       # True
print(data.index(b"l"))    # 2`,
          caption: "Core bytes operations",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "bytes is immutable — use bytearray to mutate",
          body: "You cannot assign to a bytes index: `data[0] = 65` raises TypeError. Use bytearray if you need to modify bytes in-place.",
        },
        {
          kind: "comparison",
          leftLabel: "str (text)",
          rightLabel: "bytes (binary)",
          leftCode: `s = "hello"
print(s[0])     # 'h'  (str)
print(len(s))   # 5 characters
s.upper()       # 'HELLO'`,
          rightCode: `b = b"hello"
print(b[0])     # 104  (int)
print(len(b))   # 5 bytes
b.upper()       # b'HELLO'`,
          caption: "str and bytes have similar APIs but different element types",
        },
        {
          kind: "why-matters",
          body: "bytes is the foundation of all binary I/O in Python. Every read from a binary file, every network socket receive, and every cryptographic operation returns bytes.",
        },
      ],
      interactions: [
        {
          id: "s37-bytes-predict",
          kind: "predict-output",
          prompt: "What does indexing a bytes object return?",
          beginnerPurpose: "Distinguish bytes indexing from str indexing",
          expectedConceptIds: ["binary-data"],
          code: `data = b"ABC"
print(type(data[0]))
print(data[0])`,
          expectedOutput: "<class 'int'>\n65",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Unlike str where indexing gives a single character, bytes indexing gives an integer (the byte value)." }],
          feedback: {
            correct: "Correct! bytes indexing returns int, not a single-byte bytes object.",
            incorrect: "Remember: str[i] gives a 1-char str, but bytes[i] gives an int (the byte value 0–255).",
          },
        },
        {
          id: "s37-bytes-fill",
          kind: "fill-code",
          prompt: "Complete the code to encode a string to UTF-8 bytes and then decode it back.",
          beginnerPurpose: "Practice encode/decode round-trip",
          expectedConceptIds: ["binary-data"],
          codeTemplate: `text = "Héllo"
raw = text.___("utf-8")   # encode to bytes
back = raw.___("utf-8")   # decode back to str
print(back == text)  # True`,
          blanks: [
            { placeholder: "___", answer: "encode", caseSensitive: true },
            { placeholder: "___", answer: "decode", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "str has an .encode() method; bytes has a .decode() method." }],
          feedback: {
            correct: "Correct! encode() converts str→bytes and decode() converts bytes→str.",
            incorrect: "str uses .encode(encoding) to become bytes. bytes uses .decode(encoding) to become str.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "binary-data", recallPrompt: "What type does bytes[i] return?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-bytes-predict", "s37-bytes-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.3 bytearray ──────────────────────────────────────────────────
    {
      id: "s37-bytearray",
      stageId: "stage-37",
      title: "The bytearray Type",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create and mutate bytearray objects",
        "Use bytearray for in-place binary data manipulation",
        "Convert between bytes and bytearray",
      ],
      prerequisites: ["s37-bytes"],
      concepts: ["binary-data"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## The `bytearray` Type\n\n`bytearray` is the **mutable** counterpart to `bytes`. It supports the same read operations as `bytes`, plus item assignment and mutation methods.\n\n```python\nba = bytearray(b\"hello\")\nba[0] = 72          # mutation — OK!\nba.append(33)       # add byte 33 ('!')\nba.extend(b\" world\")\n```",
        },
        {
          kind: "code",
          language: "python",
          code: `ba = bytearray(b"hello world")
ba[0] = ord('H')   # 72
ba[6] = ord('W')   # 87
print(ba)          # bytearray(b'Hello World')
print(bytes(ba))   # b'Hello World'

# Useful for building binary packets
packet = bytearray()
packet.append(0x01)          # command byte
packet.extend((100).to_bytes(2, "big"))  # payload length
packet.extend(b"ping")       # payload
print(packet.hex())  # 010064ping in hex`,
          caption: "bytearray allows in-place mutation and building binary packets",
        },
        {
          kind: "comparison",
          leftLabel: "bytes (immutable)",
          rightLabel: "bytearray (mutable)",
          leftCode: `b = b"hello"
b[0] = 72  # TypeError!`,
          rightCode: `ba = bytearray(b"hello")
ba[0] = 72  # OK
print(ba)   # bytearray(b'Hello')`,
          caption: "Use bytearray when you need to modify binary data in-place",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Convert freely between bytes and bytearray",
          body: "bytes(ba) converts a bytearray to immutable bytes. bytearray(b) does the reverse. Both are O(n) copies.",
        },
        {
          kind: "why-matters",
          body: "bytearray is ideal for building binary protocol messages incrementally, XOR-masking WebSocket frames, and modifying binary file headers without re-allocating a new bytes object.",
        },
      ],
      interactions: [
        {
          id: "s37-bytearray-predict",
          kind: "predict-output",
          prompt: "What is printed?",
          beginnerPurpose: "Confirm bytearray mutation semantics",
          expectedConceptIds: ["binary-data"],
          code: `ba = bytearray(b"abc")
ba[1] = 65
print(ba)`,
          expectedOutput: "bytearray(b'aAc')",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "65 is the ASCII code for 'A'. bytearray allows item assignment." }],
          feedback: {
            correct: "Correct! bytearray supports item assignment, replacing 'b' (98) with 'A' (65).",
            incorrect: "bytearray[i] = n sets byte i to integer n. ASCII 65 is 'A'.",
          },
        },
        {
          id: "s37-bytearray-mc",
          kind: "multiple-choice",
          prompt: "Which statement about bytes vs bytearray is correct?",
          beginnerPurpose: "Distinguish mutability characteristics",
          expectedConceptIds: ["binary-data"],
          options: [
            { id: "a", text: "bytes is mutable; bytearray is immutable", isCorrect: false, explanation: "It's the opposite: bytes is immutable, bytearray is mutable." },
            { id: "b", text: "Both bytes and bytearray are immutable", isCorrect: false, explanation: "bytearray supports item assignment and append/extend." },
            { id: "c", text: "bytes is immutable; bytearray is mutable", isCorrect: true, explanation: "Correct! bytes cannot be modified after creation; bytearray supports in-place changes." },
            { id: "d", text: "They are interchangeable with no difference", isCorrect: false, explanation: "They have the same read API but bytes is immutable and bytearray is mutable." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think of str (immutable) vs list (mutable). bytes/bytearray follow the same pattern." }],
          feedback: {
            correct: "Correct! bytes is immutable like str; bytearray is mutable like list.",
            incorrect: "Remember: bytes = immutable, bytearray = mutable.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "binary-data", recallPrompt: "When would you choose bytearray over bytes?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-bytearray-predict", "s37-bytearray-mc"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.4 memoryview ─────────────────────────────────────────────────
    {
      id: "s37-memoryview",
      stageId: "stage-37",
      title: "memoryview — Zero-Copy Binary Slicing",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create a memoryview over bytes or bytearray without copying",
        "Slice a memoryview to expose sub-regions of binary data",
        "Explain when memoryview improves performance",
      ],
      prerequisites: ["s37-bytearray"],
      concepts: ["binary-data"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `memoryview` — Zero-Copy Binary Slicing\n\nSlicing `bytes` creates a **copy**. For large buffers this is expensive. `memoryview` provides a **zero-copy window** into a bytes-like object's memory.\n\n```python\ndata = bytes(1_000_000)   # 1 MB\nmv = memoryview(data)\nchunk = mv[500:1000]      # NO copy — just a view\n```\n\nThis is critical for efficient network I/O, image processing, and reading file chunks.",
        },
        {
          kind: "code",
          language: "python",
          code: `import sys

data = bytearray(b"Hello, World!")
mv = memoryview(data)

# Slice without copying
header = mv[:5]
print(bytes(header))   # b'Hello'

# memoryview size is tiny compared to the data
print(sys.getsizeof(data))    # ~58 bytes (plus buffer)
print(sys.getsizeof(mv))      # ~200 bytes (just metadata)

# Cast to different format (advanced)
ints = memoryview(bytearray(b"\\x00\\x01\\x00\\x02")).cast("H")
print(list(ints))  # [256, 512] as 16-bit ints (big-endian)`,
          caption: "memoryview gives zero-copy access to binary buffers",
        },
        {
          kind: "callout",
          variant: "info",
          title: "memoryview works with any buffer protocol object",
          body: "bytes, bytearray, array.array, and NumPy arrays all implement the buffer protocol and can be wrapped in memoryview.",
        },
        {
          kind: "why-matters",
          body: "When parsing large binary files or network packets, memoryview avoids allocating copies of every sub-region. This can reduce memory use from O(n) copies to O(1) metadata.",
        },
      ],
      interactions: [
        {
          id: "s37-memoryview-mc",
          kind: "multiple-choice",
          prompt: "What is the main advantage of memoryview over bytes slicing?",
          beginnerPurpose: "Understand the performance reason for memoryview",
          expectedConceptIds: ["binary-data"],
          options: [
            { id: "a", text: "memoryview supports more string methods than bytes", isCorrect: false, explanation: "memoryview has fewer methods than bytes — it's lower level." },
            { id: "b", text: "memoryview slices do not copy the underlying data", isCorrect: true, explanation: "Correct! A memoryview slice is just a window into the same buffer — no data is copied." },
            { id: "c", text: "memoryview is mutable even when wrapping bytes", isCorrect: false, explanation: "memoryview wrapping bytes is read-only; wrapping bytearray is writable." },
            { id: "d", text: "memoryview works with str objects directly", isCorrect: false, explanation: "str does not implement the buffer protocol; you must encode to bytes first." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Consider what happens to memory when you do data[500:1000] vs memoryview(data)[500:1000]." }],
          feedback: {
            correct: "Correct! memoryview slices are zero-copy views, not new allocations.",
            incorrect: "The key benefit is zero-copy slicing — no new bytes object is allocated.",
          },
        },
        {
          id: "s37-memoryview-fill",
          kind: "fill-code",
          prompt: "Create a memoryview over a bytearray and extract a slice without copying.",
          beginnerPurpose: "Practice creating and slicing memoryview",
          expectedConceptIds: ["binary-data"],
          codeTemplate: `data = bytearray(b"ABCDEFGH")
mv = ___(data)       # wrap in memoryview
chunk = mv[2:5]      # zero-copy slice
print(bytes(chunk))  # b'CDE'`,
          blanks: [
            { placeholder: "___", answer: "memoryview", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "The function is just memoryview(obj)." }],
          feedback: {
            correct: "Correct! memoryview(data) wraps the buffer without copying.",
            incorrect: "Use memoryview(data) to create the zero-copy view.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "binary-data", recallPrompt: "Why use memoryview instead of slicing bytes directly?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-memoryview-mc", "s37-memoryview-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.5 struct ─────────────────────────────────────────────────────
    {
      id: "s37-struct",
      stageId: "stage-37",
      title: "struct — Pack and Unpack Binary Data",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use struct.pack to encode Python values into bytes",
        "Use struct.unpack to decode bytes into Python values",
        "Read and write struct format strings with byte-order prefixes",
      ],
      prerequisites: ["s37-bytes"],
      concepts: ["binary-data"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `struct` — Pack and Unpack Binary Data\n\nThe `struct` module translates between Python values and C-style binary layouts using **format strings**.\n\nFormat string prefixes control byte order:\n- `>` — big-endian (network byte order)\n- `<` — little-endian\n- `=` — native byte order\n- `!` — network (= big-endian)\n\nCommon format characters:\n| Char | Type | Size |\n|------|------|------|\n| `b` | signed byte | 1 |\n| `B` | unsigned byte | 1 |\n| `h` | short | 2 |\n| `H` | unsigned short | 2 |\n| `i` | int | 4 |\n| `I` | unsigned int | 4 |\n| `f` | float | 4 |\n| `d` | double | 8 |\n| `s` | char[] | n |",
        },
        {
          kind: "code",
          language: "python",
          code: `import struct

# Pack: Python values → bytes
data = struct.pack(">HHI", 1, 2, 1000)
print(data.hex())  # 000100020000_03e8

# Unpack: bytes → Python values
a, b, c = struct.unpack(">HHI", data)
print(a, b, c)   # 1 2 1000

# Size of format
print(struct.calcsize(">HHI"))  # 8 bytes

# Pack a fixed-length string
msg = struct.pack(">4s", b"PING")
print(msg)  # b'PING'`,
          caption: "struct.pack and struct.unpack for binary protocol messages",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use struct.Struct for repeated pack/unpack",
          body: "If you pack/unpack the same format many times, create a Struct object: `s = struct.Struct('>HHI')`. It pre-compiles the format for speed.",
        },
        {
          kind: "why-matters",
          body: "struct is the standard way to read binary file headers (PNG, BMP, WAV), parse network protocol fields, and write C-compatible binary data.",
        },
      ],
      interactions: [
        {
          id: "s37-struct-predict",
          kind: "predict-output",
          prompt: "What does struct.calcsize return for this format?",
          beginnerPurpose: "Understand format sizes",
          expectedConceptIds: ["binary-data"],
          code: `import struct
print(struct.calcsize(">BHI"))`,
          expectedOutput: "7",
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "B=1 byte, H=2 bytes, I=4 bytes. Sum them up." }],
          feedback: {
            correct: "Correct! B(1) + H(2) + I(4) = 7 bytes.",
            incorrect: "Add up the sizes: B=1, H=2, I=4 → 7 total.",
          },
        },
        {
          id: "s37-struct-fill",
          kind: "fill-code",
          prompt: "Pack two unsigned shorts (3, 7) in big-endian order, then unpack them.",
          beginnerPurpose: "Practice struct.pack and struct.unpack",
          expectedConceptIds: ["binary-data"],
          codeTemplate: `import struct
data = struct.___(">HH", 3, 7)
x, y = struct.___(">HH", data)
print(x, y)  # 3 7`,
          blanks: [
            { placeholder: "___", answer: "pack", caseSensitive: true },
            { placeholder: "___", answer: "unpack", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "struct.pack(fmt, *values) and struct.unpack(fmt, buffer)." }],
          feedback: {
            correct: "Correct! pack converts values to bytes; unpack reverses the operation.",
            incorrect: "Use struct.pack(fmt, *values) to encode and struct.unpack(fmt, buffer) to decode.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "binary-data", recallPrompt: "What does the '>' prefix mean in a struct format string?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-struct-predict", "s37-struct-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.6 pickle ─────────────────────────────────────────────────────
    {
      id: "s37-pickle",
      stageId: "stage-37",
      title: "pickle — Python Object Serialization",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use pickle.dumps and pickle.loads to serialize and deserialize Python objects",
        "Use pickle.dump and pickle.load for file-based serialization",
        "Choose appropriate pickle protocol versions",
      ],
      prerequisites: ["s37-binary-data-concepts"],
      concepts: ["serialization"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `pickle` — Python Object Serialization\n\n`pickle` serializes almost any Python object to bytes and back. It is Python-specific: pickled data cannot be read by other languages.\n\nKey functions:\n- `pickle.dumps(obj)` → bytes\n- `pickle.loads(data)` → object\n- `pickle.dump(obj, file)` → writes to binary file\n- `pickle.load(file)` → reads from binary file\n\nProtocols 0–5 control the binary format; higher protocols are faster but require newer Python. Use `protocol=pickle.HIGHEST_PROTOCOL` for best performance.",
        },
        {
          kind: "code",
          language: "python",
          code: `import pickle

data = {"name": "Alice", "scores": [95, 87, 92], "active": True}

# Serialize to bytes
raw = pickle.dumps(data, protocol=pickle.HIGHEST_PROTOCOL)
print(type(raw))  # <class 'bytes'>
print(len(raw))   # some number of bytes

# Deserialize from bytes
restored = pickle.loads(raw)
print(restored)   # {'name': 'Alice', 'scores': [95, 87, 92], 'active': True}
print(data == restored)  # True

# File-based serialization
with open("data.pkl", "wb") as f:
    pickle.dump(data, f)

with open("data.pkl", "rb") as f:
    loaded = pickle.load(f)`,
          caption: "pickle can round-trip almost any Python object",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "pickle is not secure — never unpickle untrusted data",
          body: "pickle.loads() can execute arbitrary Python code embedded in the pickle stream. Only unpickle data you created or data from a fully trusted source. See the next lesson for safe deserialization alternatives.",
        },
        {
          kind: "why-matters",
          body: "pickle is widely used for caching ML models (joblib/sklearn), Django session data, and inter-process communication via multiprocessing. Understanding pickle helps you use these frameworks correctly.",
        },
      ],
      interactions: [
        {
          id: "s37-pickle-mc",
          kind: "multiple-choice",
          prompt: "Which function would you use to write a pickled object to a file?",
          beginnerPurpose: "Distinguish the four main pickle functions",
          expectedConceptIds: ["serialization"],
          options: [
            { id: "a", text: "pickle.dumps(obj, file)", isCorrect: false, explanation: "dumps() returns bytes; it doesn't accept a file argument." },
            { id: "b", text: "pickle.dump(obj, file)", isCorrect: true, explanation: "Correct! dump() writes to a file; dumps() returns bytes." },
            { id: "c", text: "pickle.write(obj, file)", isCorrect: false, explanation: "There is no pickle.write() function." },
            { id: "d", text: "pickle.save(obj, file)", isCorrect: false, explanation: "There is no pickle.save() function." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "The 's' suffix means 'string/bytes'. dump without 's' writes to a stream." }],
          feedback: {
            correct: "Correct! dump() writes to a file; dumps() (with 's') returns bytes.",
            incorrect: "Remember: dump(obj, file) writes to file; dumps(obj) returns bytes.",
          },
        },
        {
          id: "s37-pickle-fill",
          kind: "fill-code",
          prompt: "Complete the round-trip: serialize a list to bytes, then deserialize it.",
          beginnerPurpose: "Practice the basic pickle dumps/loads cycle",
          expectedConceptIds: ["serialization"],
          codeTemplate: `import pickle
original = [1, 2, 3]
raw = pickle.___(original)         # → bytes
restored = pickle.___(raw)         # → list
print(restored == original)  # True`,
          blanks: [
            { placeholder: "___", answer: "dumps", caseSensitive: true },
            { placeholder: "___", answer: "loads", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "dumps returns bytes; loads takes bytes and returns the object." }],
          feedback: {
            correct: "Correct! dumps serializes; loads deserializes.",
            incorrect: "pickle.dumps(obj) serializes to bytes; pickle.loads(bytes) reconstructs the object.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "serialization", recallPrompt: "What is the difference between pickle.dump and pickle.dumps?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-pickle-mc", "s37-pickle-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.7 Pickle Security Risks ──────────────────────────────────────
    {
      id: "s37-pickle-security",
      stageId: "stage-37",
      title: "Pickle Security Risks",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain why unpickling untrusted data is dangerous",
        "Identify safer alternatives to pickle for inter-system data exchange",
        "Implement a basic safe-deserialize guard",
      ],
      prerequisites: ["s37-pickle"],
      concepts: ["serialization"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Pickle Security Risks\n\nPickle can execute **arbitrary code** during deserialization. A malicious pickle stream can delete files, open network connections, or launch processes:\n\n```python\nimport pickle, os\nclass Exploit:\n    def __reduce__(self):\n        return (os.system, (\"rm -rf /tmp/test\",))\n\npayload = pickle.dumps(Exploit())\npickle.loads(payload)  # executes os.system!\n```\n\n**Never unpickle data received from a network, user input, or any untrusted source.**",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "pickle.loads() is Remote Code Execution",
          body: "Unpickling attacker-controlled data is equivalent to running arbitrary Python code as your user. This is a well-known vulnerability class (CWE-502). Treat pickle data with the same suspicion as executable files.",
        },
        {
          kind: "comparison",
          leftLabel: "Unsafe (pickle from network)",
          rightLabel: "Safe (JSON from network)",
          leftCode: `# NEVER do this:
import pickle, socket
data = socket.recv(4096)
obj = pickle.loads(data)  # RCE risk`,
          rightCode: `# Safe alternative:
import json, socket
data = socket.recv(4096)
obj = json.loads(data)  # no code execution`,
          caption: "Use JSON or other language-neutral formats for untrusted data",
        },
        {
          kind: "text",
          markdown:
            "### Safe alternatives by use case\n\n| Use case | Safe alternative |\n|----------|------------------|\n| Config files | JSON, TOML, YAML |\n| Data exchange | JSON, MessagePack, Protocol Buffers |\n| ML models | ONNX, SafeTensors |\n| Caching (trusted) | pickle with HMAC signature |\n\nIf you must pickle, **sign** the pickle with HMAC and verify the signature before unpickling.",
        },
        {
          kind: "why-matters",
          body: "Pickle-based RCE vulnerabilities are routinely found in production systems — ML model serving APIs, Redis caches, and Celery queues. Knowing this risk upfront prevents costly security incidents.",
        },
      ],
      interactions: [
        {
          id: "s37-pickle-sec-mc",
          kind: "multiple-choice",
          prompt: "An API endpoint receives a pickled object from a client and calls pickle.loads() on it. What security risk does this create?",
          beginnerPurpose: "Identify pickle RCE vulnerability",
          expectedConceptIds: ["serialization"],
          options: [
            { id: "a", text: "The data might be corrupted in transit", isCorrect: false, explanation: "Data corruption is a concern, but the primary security risk is code execution." },
            { id: "b", text: "The client could send malicious code that executes on the server", isCorrect: true, explanation: "Correct! A crafted pickle stream can execute arbitrary code on the server via __reduce__." },
            { id: "c", text: "Performance will degrade under load", isCorrect: false, explanation: "Performance is a different concern; the security risk is code execution." },
            { id: "d", text: "Pickle data cannot be deserialized from a network source", isCorrect: false, explanation: "Pickle can be deserialized from any bytes source — that is exactly the problem." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what __reduce__ can return and what pickle does with it." }],
          feedback: {
            correct: "Correct! pickle.loads() from untrusted sources is a Remote Code Execution vulnerability.",
            incorrect: "pickle.loads() can execute arbitrary Python code embedded in the pickle stream by an attacker.",
          },
        },
        {
          id: "s37-pickle-sec-explain",
          kind: "plain-language-explain",
          prompt: "Explain why pickle is dangerous for data received from the network and what you should use instead.",
          beginnerPurpose: "Articulate the security risk and mitigation",
          expectedConceptIds: ["serialization"],
          code: `import pickle
# This is dangerous:
obj = pickle.loads(untrusted_bytes)`,
          keyPointsToHit: [
            "pickle can execute arbitrary code during deserialization",
            "an attacker can craft a pickle payload that runs os.system or similar",
            "use JSON or other format-neutral alternatives for network data",
          ],
          sampleAnswer: "pickle.loads() can run Python code embedded in the pickle stream. An attacker who controls the bytes can define a __reduce__ method that calls os.system or subprocess, executing commands on your server. For network data, use JSON which only represents data — it cannot embed executable code.",
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Focus on __reduce__ and what JSON does differently." }],
          feedback: {
            correct: "Excellent! You clearly understand the RCE risk and the JSON mitigation.",
            incorrect: "Cover: (1) pickle can execute code, (2) how (__reduce__), (3) safe alternative (JSON).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "serialization", recallPrompt: "Why is unpickling untrusted data a security risk?", nextReviewAfterDays: 3 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-pickle-sec-mc", "s37-pickle-sec-explain"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.8 marshal ─────────────────────────────────────────────────────
    {
      id: "s37-marshal",
      stageId: "stage-37",
      title: "marshal — Internal Python Serialization",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Explain the purpose of the marshal module",
        "Identify which types marshal supports",
        "Recognize when marshal is used internally by Python",
      ],
      prerequisites: ["s37-pickle"],
      concepts: ["serialization"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `marshal` — Internal Python Serialization\n\n`marshal` is Python's internal serialization format used to store **compiled bytecode** in `.pyc` files. It is faster than pickle but far more limited:\n\n**Supported types**: `None`, `bool`, `int`, `float`, `complex`, `str`, `bytes`, `tuple`, `list`, `set`, `frozenset`, `dict`, `code` objects\n\n**Not supported**: custom classes, instances, functions (as objects)\n\n```python\nimport marshal\ndata = marshal.dumps([1, 2, 'hello'])\nprint(marshal.loads(data))  # [1, 2, 'hello']\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "marshal is not stable across Python versions",
          body: "The marshal format can change between Python releases. Never use marshal for long-term storage or cross-version data exchange. Use pickle or JSON instead.",
        },
        {
          kind: "comparison",
          leftLabel: "marshal",
          rightLabel: "pickle",
          leftCode: `# Internal use only
# Supports basic types + code objects
# Very fast
# Not stable across Python versions
import marshal
b = marshal.dumps((1, 2, 3))`,
          rightCode: `# General purpose
# Supports almost all Python types
# Slightly slower
# Stable within a major version
import pickle
b = pickle.dumps((1, 2, 3))`,
          caption: "Choose pickle for application use; marshal is for Python internals",
        },
        {
          kind: "why-matters",
          body: "You rarely use marshal directly, but understanding it explains how .pyc files work and why they are version-specific — a .pyc from Python 3.11 cannot be loaded by Python 3.12.",
        },
      ],
      interactions: [
        {
          id: "s37-marshal-mc",
          kind: "multiple-choice",
          prompt: "What is marshal primarily used for inside Python itself?",
          beginnerPurpose: "Understand marshal's internal use case",
          expectedConceptIds: ["serialization"],
          options: [
            { id: "a", text: "Storing database records", isCorrect: false, explanation: "Databases use SQL or their own binary formats, not marshal." },
            { id: "b", text: "Serializing compiled bytecode into .pyc files", isCorrect: true, explanation: "Correct! Python uses marshal to read and write .pyc bytecode cache files." },
            { id: "c", text: "Sending Python objects over the network", isCorrect: false, explanation: "Network serialization typically uses JSON, MessagePack, or Protocol Buffers." },
            { id: "d", text: "Encrypting Python source files", isCorrect: false, explanation: "marshal does not encrypt; it only serializes." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what .pyc files contain and why they are faster to load than .py files." }],
          feedback: {
            correct: "Correct! marshal stores compiled code objects in .pyc bytecode cache files.",
            incorrect: "Python uses marshal internally for .pyc bytecode files — compiled Python source.",
          },
        },
        {
          id: "s37-marshal-predict",
          kind: "predict-output",
          prompt: "What is printed?",
          beginnerPurpose: "Confirm marshal round-trip for basic types",
          expectedConceptIds: ["serialization"],
          code: `import marshal
data = marshal.dumps({"a": 1, "b": [2, 3]})
result = marshal.loads(data)
print(result["b"])`,
          expectedOutput: "[2, 3]",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "marshal supports dicts and lists of basic types." }],
          feedback: {
            correct: "Correct! marshal round-trips basic Python types including dicts and lists.",
            incorrect: "marshal.loads(marshal.dumps(obj)) returns the original object for supported types.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "serialization", recallPrompt: "Why can't you use marshal for long-term data storage?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-marshal-mc", "s37-marshal-predict"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.9 shelve ──────────────────────────────────────────────────────
    {
      id: "s37-shelve",
      stageId: "stage-37",
      title: "shelve — Persistent Dictionary",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Open a shelve database and store/retrieve Python objects by key",
        "Use shelve as a context manager",
        "Explain shelve's writeback behaviour",
      ],
      prerequisites: ["s37-pickle"],
      concepts: ["serialization"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `shelve` — Persistent Dictionary\n\n`shelve` provides a **persistent dictionary** backed by a file. Values can be any picklable Python object. Keys must be strings.\n\n```python\nimport shelve\nwith shelve.open('mydb') as db:\n    db['config'] = {'debug': True, 'timeout': 30}\n    db['users'] = ['alice', 'bob']\n# On next run:\nwith shelve.open('mydb') as db:\n    print(db['config'])  # {'debug': True, 'timeout': 30}\n```",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "Mutating nested objects requires writeback=True",
          body: "If you do `db['key'].append(item)` without writeback=True, the change is lost. Either reassign: `val = db['key']; val.append(item); db['key'] = val`, or open with `shelve.open('mydb', writeback=True)`.",
        },
        {
          kind: "code",
          language: "python",
          code: `import shelve

# writeback=True: mutations to retrieved objects are saved automatically
with shelve.open("scores", writeback=True) as db:
    if "alice" not in db:
        db["alice"] = []
    db["alice"].append(95)   # mutation auto-saved with writeback=True

with shelve.open("scores") as db:
    print(db["alice"])  # [95]`,
          caption: "shelve with writeback=True for mutable values",
        },
        {
          kind: "why-matters",
          body: "shelve is ideal for small applications that need key–value persistence without a full database — caching script results, storing user settings, or checkpointing long computations.",
        },
      ],
      interactions: [
        {
          id: "s37-shelve-mc",
          kind: "multiple-choice",
          prompt: "What type must shelve keys be?",
          beginnerPurpose: "Know shelve's key constraint",
          expectedConceptIds: ["serialization"],
          options: [
            { id: "a", text: "Any hashable Python object", isCorrect: false, explanation: "Unlike dict, shelve only accepts string keys." },
            { id: "b", text: "str", isCorrect: true, explanation: "Correct! shelve keys must be strings." },
            { id: "c", text: "int or str", isCorrect: false, explanation: "Integers are not valid shelve keys." },
            { id: "d", text: "bytes", isCorrect: false, explanation: "bytes are not valid shelve keys; use str." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "shelve keys become filenames internally — they must be strings." }],
          feedback: {
            correct: "Correct! shelve only accepts str keys.",
            incorrect: "shelve keys must be str — unlike regular dict which accepts any hashable type.",
          },
        },
        {
          id: "s37-shelve-fill",
          kind: "fill-code",
          prompt: "Open a shelve database, store a list, and retrieve it.",
          beginnerPurpose: "Practice basic shelve read/write",
          expectedConceptIds: ["serialization"],
          codeTemplate: `import shelve
with shelve.___("mystore") as db:
    db["items"] = [1, 2, 3]

with shelve.___("mystore") as db:
    print(db["items"])  # [1, 2, 3]`,
          blanks: [
            { placeholder: "___", answer: "open", caseSensitive: true },
            { placeholder: "___", answer: "open", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "shelve.open('filename') opens or creates the database file." }],
          feedback: {
            correct: "Correct! shelve.open() creates or opens a persistent dictionary.",
            incorrect: "Use shelve.open('filename') as the context manager.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "serialization", recallPrompt: "What happens if you mutate a shelve value without writeback=True?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-shelve-mc", "s37-shelve-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.10 zlib ───────────────────────────────────────────────────────
    {
      id: "s37-zlib",
      stageId: "stage-37",
      title: "zlib — DEFLATE Compression",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Compress and decompress bytes using zlib.compress and zlib.decompress",
        "Choose a compression level trade-off",
        "Use zlib for streaming compression with compressobj",
      ],
      prerequisites: ["s37-bytes"],
      concepts: ["compression"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `zlib` — DEFLATE Compression\n\n`zlib` implements the DEFLATE algorithm (used in gzip, PNG, HTTP deflate). It operates on `bytes` objects.\n\n```python\nimport zlib\n\ncompressed = zlib.compress(data, level=6)  # level 1-9, default 6\noriginal = zlib.decompress(compressed)\n```\n\nLevel 1 = fastest, lowest ratio. Level 9 = slowest, best ratio. Level -1 = default (6).",
        },
        {
          kind: "code",
          language: "python",
          code: `import zlib

data = b"Hello, World! " * 1000  # 14000 bytes of repetitive data

compressed = zlib.compress(data, level=6)
print(f"Original:   {len(data):,} bytes")
print(f"Compressed: {len(compressed):,} bytes")
print(f"Ratio:      {len(compressed)/len(data):.1%}")

restored = zlib.decompress(compressed)
print(restored == data)  # True`,
          caption: "zlib compression ratio improves with repetitive data",
        },
        {
          kind: "callout",
          variant: "info",
          title: "zlib vs gzip vs deflate",
          body: "zlib adds a 2-byte header and Adler-32 checksum. gzip adds a larger header with filename/timestamp. Raw DEFLATE has no wrapper. Use zlib.compress for in-memory data; use the gzip module for files.",
        },
        {
          kind: "why-matters",
          body: "zlib is the compression algorithm inside PNG images, HTTP/1.1 Content-Encoding: deflate, WebSocket permessage-deflate, and many custom binary protocols.",
        },
      ],
      interactions: [
        {
          id: "s37-zlib-predict",
          kind: "predict-output",
          prompt: "Will compressing a small non-repetitive string make it smaller?",
          beginnerPurpose: "Understand compression trade-offs",
          expectedConceptIds: ["compression"],
          code: `import zlib
data = b"abc"
compressed = zlib.compress(data)
print(len(compressed) > len(data))`,
          expectedOutput: "True",
          allowedAttempts: 3,
          hints: [{ level: "concept", text: "Compression adds overhead (headers, metadata). Very small or random data can grow when compressed." }],
          feedback: {
            correct: "Correct! zlib adds overhead, so tiny strings get larger after compression.",
            incorrect: "Compression only wins on data with patterns/repetition. Short random data expands.",
          },
        },
        {
          id: "s37-zlib-fill",
          kind: "fill-code",
          prompt: "Compress data with maximum compression level, then decompress it.",
          beginnerPurpose: "Practice zlib compress/decompress with level",
          expectedConceptIds: ["compression"],
          codeTemplate: `import zlib
data = b"repetitive " * 100
compressed = zlib.___(data, level=___)   # maximum compression
restored = zlib.___(compressed)
print(restored == data)  # True`,
          blanks: [
            { placeholder: "___", answer: "compress", caseSensitive: true },
            { placeholder: "___", answer: "9", caseSensitive: true },
            { placeholder: "___", answer: "decompress", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "Level 9 is maximum compression. zlib.compress(data, level=9)." }],
          feedback: {
            correct: "Correct! zlib.compress with level=9 for maximum compression, zlib.decompress to restore.",
            incorrect: "zlib.compress(data, level=9) then zlib.decompress(compressed).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "compression", recallPrompt: "What trade-off does the zlib compression level control?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-zlib-predict", "s37-zlib-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.11 gzip ───────────────────────────────────────────────────────
    {
      id: "s37-gzip",
      stageId: "stage-37",
      title: "gzip — File Compression",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Open .gz files for reading and writing with gzip.open",
        "Compress and decompress bytes in memory with gzip.compress",
        "Explain when to prefer gzip over zlib",
      ],
      prerequisites: ["s37-zlib"],
      concepts: ["compression"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `gzip` — File Compression\n\nThe `gzip` module wraps zlib's DEFLATE algorithm in the gzip file format (`.gz`). It interoperates with the `gzip` command-line tool.\n\n```python\nimport gzip\n\n# Write a compressed file\nwith gzip.open('data.gz', 'wb') as f:\n    f.write(b'Hello, compressed world!')\n\n# Read a compressed file\nwith gzip.open('data.gz', 'rb') as f:\n    content = f.read()\n\n# In-memory compression\ncompressed = gzip.compress(b'some data')\noriginal = gzip.decompress(compressed)\n```",
        },
        {
          kind: "code",
          language: "python",
          code: `import gzip, json

# Compress JSON data to a .gz file
records = [{"id": i, "value": i * 2} for i in range(1000)]
json_bytes = json.dumps(records).encode("utf-8")

with gzip.open("records.json.gz", "wb") as f:
    f.write(json_bytes)

# Read it back (gzip.open handles decompression transparently)
with gzip.open("records.json.gz", "rb") as f:
    loaded = json.loads(f.read().decode("utf-8"))

print(len(loaded))  # 1000`,
          caption: "gzip.open compresses transparently — read/write like a normal file",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Use 'wt' / 'rt' mode for text content",
          body: "gzip.open supports text modes ('rt', 'wt') that handle encoding automatically. No need to manually encode/decode UTF-8.",
        },
        {
          kind: "why-matters",
          body: "gzip is the dominant compression format for log files, database dumps, large datasets (JSONL.gz, CSV.gz), and HTTP responses. Mastering gzip.open lets you process large compressed files line-by-line without decompressing to disk.",
        },
      ],
      interactions: [
        {
          id: "s37-gzip-mc",
          kind: "multiple-choice",
          prompt: "What mode should you use with gzip.open to write text (str) directly without manually encoding?",
          beginnerPurpose: "Distinguish binary and text modes in gzip.open",
          expectedConceptIds: ["compression"],
          options: [
            { id: "a", text: "'wb'", isCorrect: false, explanation: "'wb' is binary write — you must encode str to bytes manually." },
            { id: "b", text: "'wt'", isCorrect: true, explanation: "Correct! 'wt' is text write mode; gzip.open handles encoding for you." },
            { id: "c", text: "'w'", isCorrect: false, explanation: "'w' without 'b' or 't' defaults to text but is less explicit — prefer 'wt'." },
            { id: "d", text: "'w+b'", isCorrect: false, explanation: "'w+b' is not a valid gzip mode combination." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "Like regular open(), add 't' for text mode. 'wt' = write text." }],
          feedback: {
            correct: "Correct! 'wt' mode lets you write str directly; gzip.open encodes it automatically.",
            incorrect: "Use 'wt' for text strings and 'wb' for bytes. 'wt' handles encoding automatically.",
          },
        },
        {
          id: "s37-gzip-fill",
          kind: "fill-code",
          prompt: "Write a string to a .gz file, then read it back.",
          beginnerPurpose: "Practice gzip.open for text files",
          expectedConceptIds: ["compression"],
          codeTemplate: `import gzip
with gzip.open("out.gz", "___") as f:
    f.write("Hello gzip!")

with gzip.open("out.gz", "___") as f:
    print(f.read())  # Hello gzip!`,
          blanks: [
            { placeholder: "___", answer: "wt", caseSensitive: true },
            { placeholder: "___", answer: "rt", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "'wt' = write text, 'rt' = read text." }],
          feedback: {
            correct: "Correct! 'wt' writes text and 'rt' reads it back from the compressed file.",
            incorrect: "Use 'wt' to write and 'rt' to read text through gzip.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "compression", recallPrompt: "How do you read a .gz file line-by-line in Python?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-gzip-mc", "s37-gzip-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.12 bz2 ────────────────────────────────────────────────────────
    {
      id: "s37-bz2",
      stageId: "stage-37",
      title: "bz2 — Bzip2 Compression",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Use bz2.compress and bz2.decompress for in-memory compression",
        "Open .bz2 files with bz2.open",
        "Compare bz2 compression ratio and speed to gzip",
      ],
      prerequisites: ["s37-gzip"],
      concepts: ["compression"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `bz2` — Bzip2 Compression\n\nbz2 uses the Burrows-Wheeler algorithm. It typically achieves **better compression ratios than gzip** at the cost of significantly slower compression and decompression.\n\n```python\nimport bz2\n\ncompressed = bz2.compress(data, compresslevel=9)\noriginal = bz2.decompress(compressed)\n\nwith bz2.open('data.bz2', 'wb') as f:\n    f.write(data)\n```\n\nFiles produced are compatible with the Unix `bzip2` tool.",
        },
        {
          kind: "comparison",
          leftLabel: "gzip",
          rightLabel: "bz2",
          leftCode: `import gzip
c = gzip.compress(data)
# Faster, moderate ratio
# Common for logs, web`,
          rightCode: `import bz2
c = bz2.compress(data)
# Slower, better ratio
# Common for source archives`,
          caption: "Choose bz2 when compression ratio matters more than speed",
        },
        {
          kind: "why-matters",
          body: "bz2 is used in Debian/Ubuntu package archives (.deb) and Python source tarballs (.tar.bz2). Understanding it helps you work with these archives in automation scripts.",
        },
      ],
      interactions: [
        {
          id: "s37-bz2-mc",
          kind: "multiple-choice",
          prompt: "Compared to gzip, bz2 typically produces what result?",
          beginnerPurpose: "Know the bz2 vs gzip trade-off",
          expectedConceptIds: ["compression"],
          options: [
            { id: "a", text: "Faster compression and larger files", isCorrect: false, explanation: "bz2 is slower, not faster." },
            { id: "b", text: "Slower compression and smaller files", isCorrect: true, explanation: "Correct! bz2 spends more CPU to achieve better compression ratios." },
            { id: "c", text: "Faster compression and smaller files", isCorrect: false, explanation: "bz2 does get smaller files but at the cost of speed, not with faster speed." },
            { id: "d", text: "Same speed and same file size", isCorrect: false, explanation: "bz2 and gzip have measurably different performance and ratio characteristics." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Better compression ratio usually means more CPU work." }],
          feedback: {
            correct: "Correct! bz2 compresses more but takes longer than gzip.",
            incorrect: "bz2 achieves better compression ratios but is significantly slower than gzip.",
          },
        },
        {
          id: "s37-bz2-fill",
          kind: "fill-code",
          prompt: "Compress bytes using bz2 and decompress to verify the round-trip.",
          beginnerPurpose: "Practice bz2 compress/decompress",
          expectedConceptIds: ["compression"],
          codeTemplate: `import bz2
data = b"Python " * 500
compressed = bz2.___(data)
restored = bz2.___(compressed)
print(restored == data)  # True`,
          blanks: [
            { placeholder: "___", answer: "compress", caseSensitive: true },
            { placeholder: "___", answer: "decompress", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "bz2.compress() and bz2.decompress() mirror the gzip API." }],
          feedback: {
            correct: "Correct! bz2.compress and bz2.decompress work like gzip equivalents.",
            incorrect: "bz2.compress(data) then bz2.decompress(compressed).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "compression", recallPrompt: "When would you choose bz2 over gzip?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-bz2-mc", "s37-bz2-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.13 lzma ───────────────────────────────────────────────────────
    {
      id: "s37-lzma",
      stageId: "stage-37",
      title: "lzma — LZMA/XZ Compression",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Compress and decompress data using lzma.compress and lzma.decompress",
        "Open .xz and .lzma files using lzma.open",
        "Compare lzma to gzip and bz2 for compression ratio and speed",
      ],
      prerequisites: ["s37-bz2"],
      concepts: ["compression"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `lzma` — LZMA/XZ Compression\n\nlzma uses the Lempel-Ziv-Markov chain algorithm. It typically achieves **the best compression ratio** of the three standard algorithms (gzip, bz2, lzma) but is the **slowest** to compress.\n\n```python\nimport lzma\n\ncompressed = lzma.compress(data)\noriginal = lzma.decompress(compressed)\n\nwith lzma.open('data.xz', 'wb') as f:\n    f.write(data)\n```\n\nThe xz format is standard in Linux distributions (Fedora, Arch, newer Ubuntu).",
        },
        {
          kind: "comparison",
          leftLabel: "Algorithm speed ranking",
          rightLabel: "Algorithm ratio ranking",
          leftCode: `# Fastest → Slowest:
# gzip >> bz2 > lzma
# Use gzip when speed matters`,
          rightCode: `# Smallest → Largest files:
# lzma > bz2 > gzip
# Use lzma when storage matters`,
          caption: "lzma wins on ratio but loses on speed",
        },
        {
          kind: "why-matters",
          body: "lzma is used in Linux package managers (xz), Python source tarballs, and many embedded/firmware contexts where storage is constrained. Decompression is fast — lzma is often a good choice for files that are written once but read many times.",
        },
      ],
      interactions: [
        {
          id: "s37-lzma-mc",
          kind: "multiple-choice",
          prompt: "Which compression module generally produces the smallest output?",
          beginnerPurpose: "Know the compression ratio ranking",
          expectedConceptIds: ["compression"],
          options: [
            { id: "a", text: "gzip", isCorrect: false, explanation: "gzip has the worst ratio of the three but is fastest." },
            { id: "b", text: "bz2", isCorrect: false, explanation: "bz2 is better than gzip but not as good as lzma." },
            { id: "c", text: "lzma", isCorrect: true, explanation: "Correct! lzma typically achieves the best compression ratio." },
            { id: "d", text: "zlib", isCorrect: false, explanation: "zlib uses the same algorithm as gzip (DEFLATE) — same ratio." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "The ranking from worst to best ratio: gzip < bz2 < lzma." }],
          feedback: {
            correct: "Correct! lzma achieves the best compression ratio among the three standard algorithms.",
            incorrect: "Ratio ranking: gzip (worst) < bz2 < lzma (best).",
          },
        },
        {
          id: "s37-lzma-fill",
          kind: "fill-code",
          prompt: "Compress and decompress data using lzma.",
          beginnerPurpose: "Practice lzma compress/decompress",
          expectedConceptIds: ["compression"],
          codeTemplate: `import lzma
data = b"The quick brown fox " * 200
compressed = lzma.___(data)
restored = lzma.___(compressed)
print(restored == data)  # True`,
          blanks: [
            { placeholder: "___", answer: "compress", caseSensitive: true },
            { placeholder: "___", answer: "decompress", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "lzma.compress() and lzma.decompress() are the same API as gzip and bz2." }],
          feedback: {
            correct: "Correct! lzma.compress/decompress follows the same pattern as gzip and bz2.",
            incorrect: "lzma.compress(data) then lzma.decompress(compressed).",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "compression", recallPrompt: "What is the main trade-off of lzma vs gzip?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-lzma-mc", "s37-lzma-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.14 zipfile ────────────────────────────────────────────────────
    {
      id: "s37-zipfile",
      stageId: "stage-37",
      title: "zipfile — Working with ZIP Archives",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create ZIP archives with ZipFile and add files or data",
        "Read and extract files from existing ZIP archives",
        "List archive contents and inspect metadata",
      ],
      prerequisites: ["s37-zlib"],
      concepts: ["compression"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `zipfile` — Working with ZIP Archives\n\nThe `zipfile` module reads and writes ZIP format archives. ZIP is a **container** format that can hold multiple files, each optionally compressed.\n\n```python\nimport zipfile\n\n# Create a ZIP archive\nwith zipfile.ZipFile('archive.zip', 'w', compression=zipfile.ZIP_DEFLATED) as zf:\n    zf.write('data.txt')           # add an existing file\n    zf.writestr('hello.txt', 'Hi!')  # add data as a virtual file\n\n# Read a ZIP archive\nwith zipfile.ZipFile('archive.zip', 'r') as zf:\n    print(zf.namelist())          # list files\n    content = zf.read('hello.txt')  # read file content\n```",
        },
        {
          kind: "code",
          language: "python",
          code: `import zipfile, io

# Create in-memory ZIP
buffer = io.BytesIO()
with zipfile.ZipFile(buffer, 'w', zipfile.ZIP_DEFLATED) as zf:
    zf.writestr("config.json", '{"debug": true}')
    zf.writestr("README.txt", "Generated archive")

buffer.seek(0)

# Inspect contents
with zipfile.ZipFile(buffer) as zf:
    for info in zf.infolist():
        print(f"{info.filename}: {info.file_size} bytes uncompressed, "
              f"{info.compress_size} bytes compressed")`,
          caption: "Create and inspect in-memory ZIP archives",
        },
        {
          kind: "callout",
          variant: "tip",
          title: "Always use ZIP_DEFLATED for compression",
          body: "The default compression is ZIP_STORED (no compression). Pass compression=zipfile.ZIP_DEFLATED to actually compress file contents.",
        },
        {
          kind: "why-matters",
          body: "ZIP is the container format for .docx/.xlsx/.jar/.whl files and countless other formats. zipfile lets you create deployment archives, inspect .whl Python packages, and build download bundles programmatically.",
        },
      ],
      interactions: [
        {
          id: "s37-zipfile-mc",
          kind: "multiple-choice",
          prompt: "What compression is used by ZipFile by default (no compression= argument)?",
          beginnerPurpose: "Know zipfile's default compression mode",
          expectedConceptIds: ["compression"],
          options: [
            { id: "a", text: "ZIP_DEFLATED — uses DEFLATE algorithm", isCorrect: false, explanation: "DEFLATE is not the default; you must pass it explicitly." },
            { id: "b", text: "ZIP_STORED — no compression", isCorrect: true, explanation: "Correct! The default is ZIP_STORED, which archives files without compressing them." },
            { id: "c", text: "ZIP_BZIP2 — uses bz2", isCorrect: false, explanation: "ZIP_BZIP2 exists but is not the default." },
            { id: "d", text: "ZIP_LZMA — uses lzma", isCorrect: false, explanation: "ZIP_LZMA exists but is not the default." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "To get compression, you must explicitly pass compression=zipfile.ZIP_DEFLATED." }],
          feedback: {
            correct: "Correct! Default is ZIP_STORED. You must specify ZIP_DEFLATED to compress.",
            incorrect: "Without compression=zipfile.ZIP_DEFLATED, ZipFile uses ZIP_STORED (no compression).",
          },
        },
        {
          id: "s37-zipfile-fill",
          kind: "fill-code",
          prompt: "Create a ZIP file with one compressed text entry, then read that entry back.",
          beginnerPurpose: "Practice ZipFile write/read cycle",
          expectedConceptIds: ["compression"],
          codeTemplate: `import zipfile
with zipfile.ZipFile("out.zip", "w", zipfile.ZIP_DEFLATED) as zf:
    zf.___(\"hello.txt\", \"Hello ZIP!\")

with zipfile.ZipFile("out.zip", "r") as zf:
    data = zf.___("hello.txt")
    print(data)  # b'Hello ZIP!'`,
          blanks: [
            { placeholder: "___", answer: "writestr", caseSensitive: true },
            { placeholder: "___", answer: "read", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "writestr(name, data) adds a virtual file. read(name) returns bytes." }],
          feedback: {
            correct: "Correct! writestr adds data as a named entry; read retrieves it.",
            incorrect: "zf.writestr('name', data) to write; zf.read('name') to read.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "compression", recallPrompt: "How do you create a compressed (not stored) ZIP archive?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-zipfile-mc", "s37-zipfile-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.15 tarfile ────────────────────────────────────────────────────
    {
      id: "s37-tarfile",
      stageId: "stage-37",
      title: "tarfile — TAR Archive Handling",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Create .tar, .tar.gz, and .tar.bz2 archives with tarfile.open",
        "Extract specific members from a TAR archive safely",
        "List archive members and inspect their metadata",
      ],
      prerequisites: ["s37-gzip", "s37-bz2"],
      concepts: ["compression"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## `tarfile` — TAR Archive Handling\n\nTAR archives bundle files while preserving Unix permissions and symlinks. Compression is applied to the whole archive (unlike ZIP which compresses each file individually).\n\nMode strings:\n- `'r'` — read any format\n- `'w:gz'` — write gzip-compressed\n- `'w:bz2'` — write bzip2-compressed\n- `'w:xz'` — write xz-compressed\n- `'r:*'` — read any compression transparently\n\n```python\nimport tarfile\n\nwith tarfile.open('archive.tar.gz', 'w:gz') as tar:\n    tar.add('mydir')  # add a directory recursively\n```",
        },
        {
          kind: "code",
          language: "python",
          code: `import tarfile

# Create a .tar.gz archive
with tarfile.open("dist.tar.gz", "w:gz") as tar:
    tar.add("src/", arcname="src")   # arcname controls name inside archive

# List contents
with tarfile.open("dist.tar.gz", "r:*") as tar:
    for member in tar.getmembers():
        print(f"{member.name} ({member.size} bytes)")

# Safe extraction — avoid path traversal
with tarfile.open("dist.tar.gz", "r:*") as tar:
    tar.extractall(path="/tmp/safe", filter="data")`,
          caption: "Create, list, and safely extract TAR archives",
        },
        {
          kind: "callout",
          variant: "danger",
          title: "Tar path-traversal attacks",
          body: "Malicious archives can contain entries like '../../../etc/passwd'. Always use filter='data' (Python 3.12+) or manually validate member names before extraction. Never extract untrusted archives without a safety filter.",
        },
        {
          kind: "why-matters",
          body: "tar.gz and tar.bz2 are the dominant formats for source code distributions, Docker image layers, and Linux package sources. Understanding tarfile lets you build and process these in pure Python.",
        },
      ],
      interactions: [
        {
          id: "s37-tarfile-mc",
          kind: "multiple-choice",
          prompt: "Which mode string opens a TAR archive for writing with gzip compression?",
          beginnerPurpose: "Learn tarfile mode strings",
          expectedConceptIds: ["compression"],
          options: [
            { id: "a", text: "'wg'", isCorrect: false, explanation: "'wg' is not a valid tarfile mode." },
            { id: "b", text: "'w:gz'", isCorrect: true, explanation: "Correct! 'w:gz' writes a gzip-compressed TAR archive." },
            { id: "c", text: "'wb:gz'", isCorrect: false, explanation: "'wb:gz' is not a valid tarfile mode." },
            { id: "d", text: "'w+gz'", isCorrect: false, explanation: "'w+gz' is not a valid tarfile mode." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "syntax", text: "tarfile mode strings use a colon: 'w:gz', 'w:bz2', 'w:xz'." }],
          feedback: {
            correct: "Correct! tarfile uses colon-separated mode and compression: 'w:gz'.",
            incorrect: "tarfile modes use a colon: 'w:gz' for gzip, 'w:bz2' for bzip2.",
          },
        },
        {
          id: "s37-tarfile-fill",
          kind: "fill-code",
          prompt: "Open a .tar.gz for writing and add a file named 'data.txt'.",
          beginnerPurpose: "Practice creating tar archives",
          expectedConceptIds: ["compression"],
          codeTemplate: `import tarfile
with tarfile.___("bundle.tar.gz", "w:gz") as tar:
    tar.___("data.txt")`,
          blanks: [
            { placeholder: "___", answer: "open", caseSensitive: true },
            { placeholder: "___", answer: "add", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "tarfile.open(name, mode) opens the archive; tar.add(path) adds a file." }],
          feedback: {
            correct: "Correct! tarfile.open with 'w:gz' mode, then tar.add() for files.",
            incorrect: "tarfile.open('name', 'w:gz') then tar.add('filename').",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "compression", recallPrompt: "What security risk exists when extracting TAR archives and how do you mitigate it?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-tarfile-mc", "s37-tarfile-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.16 Checksums ──────────────────────────────────────────────────
    {
      id: "s37-checksums",
      stageId: "stage-37",
      title: "Checksums and Data Integrity",
      kind: "concept",
      difficulty: "intermediate",
      objectives: [
        "Compute CRC32 and Adler-32 checksums with zlib",
        "Use hashlib to compute SHA-256 checksums for files",
        "Verify file integrity by comparing checksums",
      ],
      prerequisites: ["s37-zlib"],
      concepts: ["binary-data"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Checksums and Data Integrity\n\nA **checksum** is a small digest of a larger data block used to detect corruption. Python provides several checksum functions:\n\n- `zlib.crc32(data)` — CRC-32 (fast, 32-bit, used in ZIP/PNG/Ethernet)\n- `zlib.adler32(data)` — Adler-32 (faster, 32-bit, used in zlib headers)\n- `hashlib.sha256(data).hexdigest()` — SHA-256 (cryptographic, 256-bit)\n\nFor **integrity checking** (detect corruption), CRC32 is sufficient. For **security-sensitive** verification (authentication, signatures), use SHA-256 or better.",
        },
        {
          kind: "code",
          language: "python",
          code: `import zlib, hashlib

data = b"Important data that must not be corrupted"

# Fast non-cryptographic checksums
crc = zlib.crc32(data)
print(f"CRC32:   {crc & 0xffffffff:08x}")

adler = zlib.adler32(data)
print(f"Adler32: {adler & 0xffffffff:08x}")

# Cryptographic hash for security-sensitive integrity
sha256 = hashlib.sha256(data).hexdigest()
print(f"SHA-256: {sha256}")

# File checksum
def file_sha256(path: str) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()`,
          caption: "CRC32 for fast integrity; SHA-256 for cryptographic verification",
        },
        {
          kind: "callout",
          variant: "warning",
          title: "CRC32 is not a cryptographic hash",
          body: "CRC32 detects accidental corruption but can be forged by an attacker. Never use CRC32 to verify that a file hasn't been tampered with maliciously — use SHA-256 or HMAC-SHA256.",
        },
        {
          kind: "why-matters",
          body: "Checksums are how pip verifies downloaded packages, how git tracks file changes, and how archive tools detect corruption. Building this into your file pipelines prevents silent data corruption.",
        },
      ],
      interactions: [
        {
          id: "s37-checksums-mc",
          kind: "multiple-choice",
          prompt: "You want to verify that a downloaded file matches the vendor's published hash. Which checksum should you use?",
          beginnerPurpose: "Choose the right checksum type for security use",
          expectedConceptIds: ["binary-data"],
          options: [
            { id: "a", text: "CRC32 — fast and sufficient", isCorrect: false, explanation: "CRC32 can be forged — an attacker can produce different data with the same CRC32." },
            { id: "b", text: "SHA-256 — cryptographic hash", isCorrect: true, explanation: "Correct! SHA-256 is a cryptographic hash resistant to collision and preimage attacks." },
            { id: "c", text: "Adler-32 — built into zlib", isCorrect: false, explanation: "Adler-32 is even weaker than CRC32 for security purposes." },
            { id: "d", text: "Any checksum — they all prevent tampering", isCorrect: false, explanation: "Only cryptographic hashes like SHA-256 resist intentional tampering." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "CRC32/Adler-32 detect accidental errors. SHA-256 detects intentional tampering." }],
          feedback: {
            correct: "Correct! SHA-256 is appropriate for security-sensitive integrity verification.",
            incorrect: "Use SHA-256 for security. CRC32/Adler-32 only detect accidental corruption.",
          },
        },
        {
          id: "s37-checksums-fill",
          kind: "fill-code",
          prompt: "Compute a SHA-256 hex digest of a bytes value.",
          beginnerPurpose: "Practice hashlib SHA-256",
          expectedConceptIds: ["binary-data"],
          codeTemplate: `import hashlib
data = b"hello world"
digest = hashlib.___("sha256", data).___()
print(digest)`,
          blanks: [
            { placeholder: "___", answer: "new", caseSensitive: true },
            { placeholder: "___", answer: "hexdigest", caseSensitive: true },
          ],
          allowedAttempts: 3,
          hints: [{ level: "syntax", text: "hashlib.new('sha256', data) or hashlib.sha256(data) both work. Then call .hexdigest()." }],
          feedback: {
            correct: "Correct! hashlib.new('sha256', data).hexdigest() produces the hex digest.",
            incorrect: "hashlib.new('sha256', data).hexdigest() or hashlib.sha256(data).hexdigest().",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "binary-data", recallPrompt: "Why is CRC32 insufficient for security-sensitive file verification?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-checksums-mc", "s37-checksums-fill"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.17 Binary Parser Project ──────────────────────────────────────
    {
      id: "s37-binary-parser-project",
      stageId: "stage-37",
      title: "Binary Parser Project",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Build a binary parser that reads a custom binary format using struct",
        "Verify data integrity with checksums",
        "Write parsed results to a JSON file",
      ],
      prerequisites: ["s37-struct", "s37-checksums"],
      concepts: ["binary-data", "serialization"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Binary Parser Project\n\nYou will parse a simple custom binary format:\n\n**File format:**\n```\nMagic:   4 bytes  — b'DATA'\nVersion: 2 bytes  — uint16, big-endian\nCount:   4 bytes  — uint32, big-endian, number of records\nCRC32:   4 bytes  — CRC32 of the bytes before this field\nRecords: Count * 8 bytes each\n  - ID:    4 bytes uint32\n  - Value: 4 bytes float32\n```",
        },
        {
          kind: "code",
          language: "python",
          code: `import struct, zlib, json

HEADER_FMT = ">4sHII"   # magic, version, count, crc32
RECORD_FMT = ">If"      # id (uint32), value (float32)
HEADER_SIZE = struct.calcsize(HEADER_FMT)
RECORD_SIZE = struct.calcsize(RECORD_FMT)

def parse_binary_file(path: str) -> list[dict]:
    with open(path, "rb") as f:
        raw = f.read()

    # Parse header
    magic, version, count, stored_crc = struct.unpack(
        HEADER_FMT, raw[:HEADER_SIZE]
    )
    assert magic == b"DATA", f"Bad magic: {magic}"

    # Verify CRC (covers bytes before the CRC field)
    actual_crc = zlib.crc32(raw[:10]) & 0xffffffff
    assert actual_crc == stored_crc, "CRC mismatch — data corrupted"

    # Parse records
    records = []
    offset = HEADER_SIZE
    for _ in range(count):
        rec_id, rec_val = struct.unpack(RECORD_FMT, raw[offset:offset + RECORD_SIZE])
        records.append({"id": rec_id, "value": round(rec_val, 4)})
        offset += RECORD_SIZE

    return records

# records = parse_binary_file("data.bin")
# with open("output.json", "w") as f:
#     json.dump(records, f, indent=2)`,
          caption: "Reference implementation for the binary parser project",
        },
        {
          kind: "why-matters",
          body: "Binary parsers are foundational tools in network programming, game development, embedded systems, and data engineering. This project pattern — magic bytes, version, length, checksum, records — appears in hundreds of real file formats.",
        },
      ],
      interactions: [
        {
          id: "s37-binary-parser-mc",
          kind: "multiple-choice",
          prompt: "In the binary format above, what is the purpose of the magic bytes (b'DATA')?",
          beginnerPurpose: "Understand the role of magic bytes in binary formats",
          expectedConceptIds: ["binary-data"],
          options: [
            { id: "a", text: "To encrypt the file contents", isCorrect: false, explanation: "Magic bytes are not encryption — they are just an identifier." },
            { id: "b", text: "To identify the file format and distinguish it from other files", isCorrect: true, explanation: "Correct! Magic bytes let a parser quickly detect whether a file is the right format." },
            { id: "c", text: "To store the file version", isCorrect: false, explanation: "The version field is separate from the magic bytes." },
            { id: "d", text: "To pad the header to an aligned size", isCorrect: false, explanation: "Magic bytes identify the format, not pad the header." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "Think about what a file identifies itself with. PNG starts with \\x89PNG, ZIP starts with PK." }],
          feedback: {
            correct: "Correct! Magic bytes identify the format — like a file extension but embedded in the data.",
            incorrect: "Magic bytes are a format signature: the first bytes declare 'I am a DATA file'.",
          },
        },
        {
          id: "s37-binary-parser-reorder",
          kind: "reorder-code",
          prompt: "Put these steps in the correct order to parse a binary file record.",
          beginnerPurpose: "Practice the binary parsing workflow",
          expectedConceptIds: ["binary-data"],
          lines: [
            "raw = f.read()",
            "with open(path, 'rb') as f:",
            "magic, count = struct.unpack('>4sI', raw[:8])",
            "record = struct.unpack('>If', raw[8:16])",
          ],
          correctOrder: [1, 0, 2, 3],
          allowedAttempts: 3,
          hints: [{ level: "structural", text: "Open the file first, read all bytes, then parse header, then parse record." }],
          feedback: {
            correct: "Correct! Open → read → parse header → parse record.",
            incorrect: "Order: open file, read bytes, parse header fields, parse record fields.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "binary-data", recallPrompt: "What are magic bytes and why do binary formats use them?", nextReviewAfterDays: 5 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-binary-parser-mc", "s37-binary-parser-reorder"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },

    // ── 37.18 Archive Processing Project ─────────────────────────────────
    {
      id: "s37-archive-processing-project",
      stageId: "stage-37",
      title: "Archive Processing Project",
      kind: "project",
      difficulty: "intermediate",
      objectives: [
        "Read files from a ZIP archive and process them in memory",
        "Compress processed results and write to a new ZIP",
        "Compute checksums for all output files",
      ],
      prerequisites: ["s37-zipfile", "s37-checksums"],
      concepts: ["compression", "serialization"],
      contentBlocks: [
        {
          kind: "text",
          markdown:
            "## Archive Processing Project\n\nBuild a pipeline that:\n1. Opens an input ZIP archive\n2. Reads each text file and counts word frequencies\n3. Writes JSON results to a new compressed ZIP\n4. Appends a manifest file with SHA-256 checksums of all output files",
        },
        {
          kind: "code",
          language: "python",
          code: `import zipfile, json, hashlib, collections

def process_archive(input_zip: str, output_zip: str) -> None:
    manifest = {}

    with zipfile.ZipFile(input_zip, "r") as src, \
         zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as dst:

        for name in src.namelist():
            if not name.endswith(".txt"):
                continue

            text = src.read(name).decode("utf-8")
            words = collections.Counter(text.lower().split())
            result = json.dumps(dict(words.most_common(10)), indent=2).encode()

            out_name = name.replace(".txt", ".json")
            dst.writestr(out_name, result)

            digest = hashlib.sha256(result).hexdigest()
            manifest[out_name] = digest

        manifest_bytes = json.dumps(manifest, indent=2).encode()
        dst.writestr("manifest.json", manifest_bytes)

# process_archive("input.zip", "output.zip")`,
          caption: "Archive-to-archive processing pipeline with checksums",
        },
        {
          kind: "why-matters",
          body: "ETL pipelines, data lake ingestion, and build systems routinely process ZIP archives of data files. This pattern — read archive, transform, write new archive, verify checksums — is reusable across dozens of real scenarios.",
        },
      ],
      interactions: [
        {
          id: "s37-archive-mc",
          kind: "multiple-choice",
          prompt: "What does zipfile.ZIP_DEFLATED mean when creating a ZipFile?",
          beginnerPurpose: "Confirm understanding of ZipFile compression constants",
          expectedConceptIds: ["compression"],
          options: [
            { id: "a", text: "Files are stored without any compression", isCorrect: false, explanation: "That is ZIP_STORED, the default." },
            { id: "b", text: "Files are compressed using the DEFLATE algorithm", isCorrect: true, explanation: "Correct! ZIP_DEFLATED applies DEFLATE compression to each archived file." },
            { id: "c", text: "Files are compressed using bzip2", isCorrect: false, explanation: "bzip2 is ZIP_BZIP2, not ZIP_DEFLATED." },
            { id: "d", text: "The archive itself is encrypted", isCorrect: false, explanation: "ZIP_DEFLATED is compression, not encryption." },
          ],
          allowMultiple: false,
          allowedAttempts: 2,
          hints: [{ level: "concept", text: "DEFLATE is the algorithm used by gzip and zlib." }],
          feedback: {
            correct: "Correct! ZIP_DEFLATED applies DEFLATE compression to archive members.",
            incorrect: "ZIP_DEFLATED = DEFLATE compression. ZIP_STORED = no compression (default).",
          },
        },
        {
          id: "s37-archive-run",
          kind: "run-code",
          prompt: "Write code that creates an in-memory ZIP containing one file, then reads the file back and prints its content.",
          beginnerPurpose: "Verify end-to-end ZipFile usage",
          expectedConceptIds: ["compression"],
          starterCode: `import zipfile, io

buf = io.BytesIO()
# TODO: create ZIP with one entry 'data.txt' containing b'hello'
# Then read it back and print the content
`,
          task: "Create a ZIP with one entry 'data.txt' = b'hello', then print the read-back content.",
          expectedOutputContains: ["hello"],
          pyodideCompatible: true,
          allowedAttempts: 10,
          hints: [
            { level: "syntax", text: "ZipFile(buf, 'w') then zf.writestr('data.txt', b'hello')." },
            { level: "structural", text: "Seek buf to 0 before reading. ZipFile(buf, 'r') then zf.read('data.txt')." },
          ],
          feedback: {
            correct: "Correct! You successfully created and read an in-memory ZIP archive.",
            incorrect: "Remember to buf.seek(0) between writing and reading, then open ZipFile again to read.",
          },
        },
      ],
      reviewHooks: [
        { conceptId: "compression", recallPrompt: "How do you add a file to a ZIP archive from in-memory bytes (not a file on disk)?", nextReviewAfterDays: 4 },
      ],
      masteryCriteria: {
        requiredInteractionIds: ["s37-archive-mc", "s37-archive-run"],
        minimumCorrectFraction: 0.8,
        reviewHookIds: [],
      },
    },
  ],
  project: {
    id: "s37-project",
    stageId: "stage-37",
    title: "Binary Parser and Archive Processor",
    brief:
      "Build a tool that reads a custom binary file format using struct, verifies a CRC32 checksum, and writes processed results as JSON files in a compressed ZIP archive with a SHA-256 manifest.",
    requirements: [
      "Parse a binary file header with magic bytes, version, record count, and CRC32",
      "Verify the CRC32 checksum and raise an error on mismatch",
      "Unpack each binary record using struct",
      "Write all records as JSON to a ZIP archive with ZIP_DEFLATED compression",
      "Include a manifest.json in the ZIP with SHA-256 hashes of each output file",
      "Add type annotations to all public functions",
    ],
    acceptanceCriteria: [
      "Parser correctly reads all records from a valid binary file",
      "Parser raises ValueError when magic bytes are wrong",
      "Parser raises ValueError when CRC32 does not match",
      "Output ZIP is valid and contains correct JSON for each record",
      "manifest.json lists correct SHA-256 hashes",
      "All public functions have type annotations",
    ],
    conceptIds: ["binary-data", "serialization", "compression"],
    difficulty: "intermediate",
  },
} satisfies Stage;
