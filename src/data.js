export default [
  {
    id: "e589ef20-0d70-442f-8bc9-db7faaaff5aa",
    title: "What are Communication Protocols?",
    body: "<p>Protocols are basically a set of rules that two machines must follow in order to communicate with each other. Machines can communicate in basically 2 ways: Either over the network or by physically connecting with each other using wires/cables.</p>\n<p><br></p>\n<p>What protocols do is they standardize each step of the entire process of two machines communicating with each other. And these steps are actually designed in a way that the protocol as a whole fits the use-case and efficiently solves the problem it was designed for.</p>\n<p><br></p>\n<p>The cool part is that anyone can build their own protocol depending on their use-case. Though designing your own protocol and using it in your infrastructure is usually not an easy thing to do but big firms with hundreds of engineers might try to do it and it may or may not be successful.&nbsp;</p>\n<p><br></p>\n<p>Some popular examples of communication protocols are:</p>\n<ol>\n  <li>Transmission Control Protocol (TCP)</li>\n  <li>User Datagram Protocol (UDP)</li>\n  <li>Hyper Text Transfer Protocol (HTTP) - h1.1, h2, h3</li>\n  <li>Simple Mail Transfer Protocol (SMTP)</li>\n  <li>File Transfer Protocol (FTP)</li>\n  <li>Advanced Message Queuing Protocol (AMQP)</li>\n  <li>and many more...</li>\n</ol>\n<p>Every protocol has some properties which effectively differentiate one from the other. There are a lot of properties linked with a protocol but some of them are very common and important, so let's take a look.</p>\n<p><br></p>\n<h3>Protocol Properties</h3>\n<p><strong>Data Format</strong></p>\n<p><br></p>\n<p>Data format specifies the language in which the two machines talk to each other. And by language, I don't mean programming language. Data formats can either be <strong>Plain text, </strong>which means it can actually be read by humans like JSON, XML, or just simple text, or <strong>Binary, </strong>which I think needs no description.</p>\n<p><br></p>\n<p><strong>State</strong></p>\n<p><br></p>\n<p>The state of a protocol basically tells us if the protocol depends on the state(s) of either or both of the participants. Protocols can either be <strong>stateful</strong> or <strong>stateless</strong>.</p>\n<p><br></p>\n<p><strong>Direction</strong></p>\n<p><br></p>\n<p>By direction, I mean the direction freedom of communication, i.e., <strong>unidirectional</strong> or <strong>bidirectional</strong> (aka bidi).</p>\n<p><br></p>\n<p><strong>Transfer Mode</strong></p>\n<p><br></p>\n<p>Transfer mode refers to the way of transferring data between participants. Now people often get confused with the terminology but transfer mode can be <strong>Message based </strong>(data is sent as packets, basically it's easy to identify where a message starts and ends) or <strong>Stream based </strong>(data is sent as a continuous stream of bytes, nonstop).</p>\n<p><br></p>\n<p><strong>Addressing</strong></p>\n<p><br></p>\n<p>Addressing is actually a complex property as it diffrentiates protocols by specifying which layer the protocol works in (by layer I mean, a layer of the OSI model).</p>\n<p><br></p>\n<p><strong>Error Management</strong></p>\n<p><br></p>\n<p>Tells us how the protocol handle errors. Like the most popular protocol, HTTP uses status codes to identify different errors.</p>\n<p><br></p>\n<p><br></p>\n<p><br></p>\n<p>We should realize that protocols are very use-case specific and designed to solve a particular problem, and the popular ones that we all know about - TCP, UDP, HTTP, gRPC, were all built to solve a problem.</p>",
    bookmark: false,
    date: "4 Aug 2023",
  },
  {
    id: "e33228e8-b64a-4ea7-a77f-9e33751faf8b",
    title: "How does a Quantum Computer work?",
    body: "<p>In classical computers, we use Cbits (Classical Bits) to perform operations and each bit can have 2 possible values. It can either be a <strong>1</strong> or a <strong>0</strong>, like a light switch, it can either be on or off, there's no in-between. Now in quantum computers, we use Qubits (Quantum Bits) whose values also range between 0 and 1 but the crazy part is that they can take values both 0 and 1 at the same time. This gives quantum computers their superior computing power. Seems interesting? Let's dive deeper.<br>\n<br>\nThere are many physical objects that can be used as Qubits. An electron, a single photon, etc. We know that electrons are like tiny magnets and get aligned to an external magnetic field just like a compass needle aligns with the earth's magnetic field. We use this property to strictly align the electron. If the electron aligns opposite to that of the direction of the magnetic field, we call the configuration a <strong>zero state</strong> and when it aligns with the field we call it the <strong>one state</strong>. Now this seems similar to a classical bit, having two states, <em>zero and one</em>.<br>\n<br>\nNow just as we start to think that we have solved the problem and quantum computers are ready to use, we come across a funny thing about quantum bits, i.e. the quantum object used to make that qubit can be in both (zero and one) states at once. When you measure the state it will either be one or zero but before the measurement, the object is in a state of <strong>quantum superposition</strong>. You might have heard people say that in quantum mechanics, an object can be at two positions at the same time. That's exactly what they are talking about, <em>superposition</em> and it is <strong>not</strong> as crazy as it sounds. Let me tell you why. When an object is in superposition (i.e. before measurement), the only thing we can tell about the object's state is the probability of that object having a particular state <em>if that makes any sense</em>. Let's take an example.<br>\n<br>\nSuppose we have a qubit in a state of <em>quantum superposition</em> of <strong>1</strong> and <strong>0</strong>. We can write it as:<br>\n</p>\n<pre><code>X|1&gt; and Y|0&gt;</code></pre>\n<p><br>\nNow don't get overwhelmed by the notations, it's just a way of writing what we talked about above in the quantum mechanical language called the <strong>Bra–ket notation</strong>. Notice the variables <em><strong>X</strong></em> and <em><strong>Y</strong></em>. These are the relative probabilities of the qubit having the state 1 and 0, after measurement, respectively. If someone asks, What's the probability that the qubit is a <strong>1</strong> when I measure it? It's <em><strong>X</strong></em>. And similarly, <em><strong>Y </strong></em>is the probability of getting a <strong>0.</strong><br>\n<br>\nNow let's take things to the next level, coz why not? <br>\n<br>\nTill now we talked about only 1 qubit, but that's not ideal. Imagine having 2 qubits in a system. You would think that representing the 2 qubits will be the same as representing 2 cbits like:<br>\n</p>\n<pre><code>2 Cbits have 4 possible combinations&nbsp;</code></pre>\n<pre><code>0 0, 0 1, 1 0, 1 1&nbsp;</code></pre>\n<pre><code>In case of 2 qubits, each qubit have 2 variables linked to each possible states, hence making the total number for the entire system, 4.</code></pre>\n<pre><code>A| 0|0&gt;&nbsp;</code></pre>\n<pre><code>B| 01 + 10&gt;&nbsp;</code></pre>\n<pre><code>C| 01 - 10&gt;&nbsp;</code></pre>\n<pre><code>D| 1|1&gt; &nbsp;</code></pre>\n<pre><code>A,B,C,D are respective relative probability of each configuration.</code></pre>\n<p><br>\n<br>\nThis means that we need 4 numbers to determine the state of this system, which only required 2 numbers in case of 2 cbits. Thus, 2 qubits actually contain 4 bits of information. Similarly, if we have 3 qubits we can store 8 bits of information. 4 qubits, 16 bits of information, and so on...<br>\n<br>\n</p>\n<pre><code>Having N qubits, we can store 2^N bits of information</code></pre>\n<p><br>\n<br>\nThe power of quantum computers as compared to classical computers, grows exponentially. Now you get a pretty decent idea of how quantum computers work and how powerful they are. But as everything has some downsides, quantum computers are no exception. We know and understand that quantum computers are powerful but with this power comes a great deal of problems like the need for specific conditions in which these computers can operate and other stability issues. Harnessing the power of sub-atomic particles like electrons and photons, and using them on our command is no easy task. But despite all this, we're making some serious progress.</p>\n<p><br>\n<strong>IBM's Osprey </strong>is currently the world's most powerful quantum computer, operating with a staggering <strong>433 qubits</strong>. That is equivalent to <em>2^433</em> classical bits. You can do the math on your own or maybe just ask ChatGPT for the answer. <em>(Fun fact: ask chatGPT to recalculate and it will give you a different answer every time. We still have a long way to go.)</em><br>\n<br>\nI tried to be as simple as possible with this topic and there are obviously some really complex details hidden in almost everything we talked about in this blog but it's important for us to understand that quantum computers are really not the replacement of classical computers. Yet.</p>",
    bookmark: false,
    date: "20 Aug 2023",
  },
];
