from scapy.all import sniff


def findIp(ip):
    isFind = False
    while isFind:

        def packet_callback(packet):
            nonlocal isFind
            if packet.haslayer("IP"):
                src_ip = packet["IP"].src
                dst_ip = packet["IP"].dst
                if src_ip == ip or dst_ip == ip:
                    isFind = True

        # Use the sniff function with a timeout and store the matched packets in a list
        sniff(prn=packet_callback, count=1)
    return True
